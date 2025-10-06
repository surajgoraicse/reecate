import z from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  fullName: z.string().nullable(),
  userName: z.string().min(4, 'UserName must be atleast 4 Characters'),
  password: z.string().min(8, 'Password must be atleast 8 character long'),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const UserSchema = CreateUserSchema.extend({
  id: z.string().uuid({ message: 'User ID must be a UUID' }),
});

export type User = z.infer<typeof UserSchema>;

export const ContactSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(?:\+91\d{10}|\d{10})$/, 'Invalid phone number'),
  message: z.string().min(2, { message: 'Message is Required' }),
});

export type Contact = z.infer<typeof ContactSchema>;
