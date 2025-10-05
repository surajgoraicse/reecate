import logger from '@/config/logger.js';
import { redis } from '@/index.js';
import emailService from '@/lib/email.service.js';
import otpService from '@/lib/otp.service.js';
import {
  AccountType,
  generateTokens,
  verifyToken,
  type Payload,
} from '@/lib/token.service.js';

import type { RefreshToken } from '@/types/types.js';
import APIError from '@/utils/apiError.js';
import APIResponse from '@/utils/apiResponse.js';
import catchAsync from '@/utils/async.handler.js';
import { hashPassword, verifyHashedPassword } from '@/utils/encryption.js';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import userService from './user.service.js';
import { CreateUserSchema, type CreateUser } from './user.types.js';

const initRegister = catchAsync(async (req: Request, res: Response) => {
  const { email, password, fullName, userName }: CreateUser = req.body;
  const validateData = CreateUserSchema.safeParse({
    email,
    password,
    fullName,
    userName,
  });
  if (!validateData.success) {
    throw new APIError(
      400,
      'Register Data validation failed',
      validateData.error?.format()
    );
  }
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    throw new APIError(400, 'User Email already exists');
  }
  const hashedPassword = await hashPassword(password);
  await redis.setValue(
    `register:${email}`,
    JSON.stringify({
      email,
      fullName,
      password: hashedPassword,
      userName,
    }),
    60 * 5
  );

  const otp = await otpService.generateOtp(email);

  await emailService.sendEmail({
    to: email,
    subject: 'Your OTP code ',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes`,
  });
  logger.debug('otp : ', otp);
  res.status(200).json(
    new APIResponse(200, 'OTP sent to your Email for Verification', {
      otp: otp,
    })
  );
});

const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new APIError(400, 'Email and OTP are requried');
  }

  const user_data = await redis.getValue(`register:${email}`);
  if (!user_data) {
    throw new APIError(400, 'Registration session expired or not found');
  }
  const parsedUser = JSON.parse(user_data);
  const isVerified = await otpService.verifyOtp(email, otp);

  if (!isVerified) {
    throw new APIError(400, 'Invalid OTP');
  }
  const user = await userService.createUser({
    email: parsedUser.email,
    fullName: parsedUser.fullName,
    password: parsedUser.password,
    userName: parsedUser.userName,
  });

  if (!user) {
    throw new APIError(
      500,
      `[USER_CONTROLLER] : User Verify Registration Error`
    );
  }
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens({
    accountType: AccountType.USER,
    id: user.id,
    jti,
  });

  // clean up redis data after registration
  await redis.deleteValue(`register:${email}`);

  res.status(201).json(
    new APIResponse(201, 'User Created Successfully', {
      token: { accessToken, refreshToken },
    })
  );
  return;
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new APIError(400, 'Email and Password are required.');
  }
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new APIError(400, 'User not found.');
  }
  const isPasswordCorrect = await verifyHashedPassword(user.password, password);
  if (!isPasswordCorrect) {
    throw new APIError(400, 'Incorrect Password.');
  }
  const jti = uuidv4();
  const token = generateTokens({
    accountType: AccountType.USER,
    id: user.id,
    jti: jti,
  });
  console.log(token);

  res.status(200).json(
    new APIResponse(200, 'User logged in Successfully', {
      token: token,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    })
  );
  return;
});

const resendOtpToMail = catchAsync(async (req: Request, res: Response) => {
  const { email: rawEmail } = req.body;
  const { success, data: email } = z.string().email().safeParse(rawEmail);

  if (!success || !email) {
    throw new APIError(400, 'Missing required fields: Email is required');
  }
  try {
    // check if user exist
    const userExists = await userService.getUserByEmail(email);
    if (userExists) {
      throw new APIError(400, 'User is already verified, cannot resend OTP');
    }

    // check if registration session exists:
    const registrationData = await redis.getValue(`register:${email}`);
    if (!registrationData) {
      throw new APIError(
        400,
        'No registration session found. Please start registration process again'
      );
    }

    // send OTP
    const otp = await otpService.generateOtp(email);

    //send response
    res.status(200).json(new APIResponse(200, 'OTP sent successfully', otp));
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new APIError(400, error.errors.map((e) => e.message).join(', '));
    }
    if (error instanceof APIError) {
      throw error;
    }
  }
});

const forgotPassword = catchAsync(async (_req: Request, _res: Response) => {});

const resetPassword = catchAsync(async (_req: Request, _res: Response) => {});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const { token }: RefreshToken = req.body;
  if (!token) {
    throw new APIError(400, 'Invalid or expired refresh token');
  }

  const decodedToken = verifyToken(token) as Payload;
  if (!decodedToken) {
    throw new APIError(401, 'Invalid or Expired Refresh Token');
  }

  // check if user still exists and is active
  const user = await userService.getUserById(decodedToken.id);
  if (!user) {
    throw new APIError(404, 'User Not Found');
  }

  // Generate new access and refresh tokens
  const jti = crypto.randomUUID();
  const newToken = generateTokens({
    accountType: AccountType.USER,
    id: user.id,
    jti,
  });

  res
    .status(200)
    .json(
      new APIResponse(200, 'Token Refreshed Successfully', { ...newToken })
    );

  return;
});

export default {
  initRegister,
  verifyRegistration,
  login,
  resendOtpToMail,
  forgotPassword,
  resetPassword,
  refreshTokens,
};
