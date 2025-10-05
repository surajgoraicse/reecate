// import type { AdminLogin } from '@/@types/interface.js';
// import adminService from '@/services/admin.service.js';

// export const authenticateAdmin = catchAsync(
//   async (req: Request, _res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       logger.warn(
//         '[ADMIN_MIDDLEWARE] No Bearer token found in Authorization header'
//       );
//       throw new ApiError(
//         401,
//         'Authentication required. Please provide a valid token.'
//       );
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const decoded = jwt.verify(token, envVars.JWT_SECRET) as jwt.JwtPayload;
//       if (!decoded.id || !decoded.jti) {
//         throw new ApiError(401, 'Invalid token payload.');
//       }

//       const admin = await adminService.getAdminById(decoded.id);
//       if (!admin) {
//         throw new ApiError(
//           401,
//           'Unauthorized. Admin associated with this token not found.'
//         );
//       }

//       req.admin = admin;

//       logger.info(
//         `[ADMIN_MIDDLEWARE] Admin authenticated successfully: ${admin.id}`
//       );

//       next();
//     } catch (error) {
//       if (error instanceof ApiError) {
//         throw error;
//       }
//       if (error instanceof jwt.TokenExpiredError) {
//         logger.warn('[ADMIN_MIDDLEWARE] JWT token expired');
//         throw new ApiError(401, 'Token has expired. Please log in again.');
//       }
//       if (error instanceof jwt.JsonWebTokenError) {
//         logger.warn('[ADMIN_MIDDLEWARE] Invalid JWT token');
//         throw new ApiError(401, 'Invalid token. Please log in again.');
//       }
//       logger.error(
//         '[ADMIN_MIDDLEWARE] Unexpected admin authentication error:',
//         error
//       );
//       throw new ApiError(
//         500,
//         'An unexpected error occurred during admin authentication.'
//       );
//     }
//   }
// );

// export const authorizeSuperAdmin = catchAsync(
//   async (req: Request, _res: Response, next: NextFunction) => {
//     const admin = req.admin;
//     if (admin.role === 'SUPER') {
//       logger.info(
//         `[ADMIN_MIDDLEWARE] Super admin authorization granted for admin ID: ${admin.id}`
//       );
//       next();
//     } else {
//       logger.warn(
//         `[ADMIN_MIDDLEWARE] Super admin authorization denied for admin ID: ${admin.id}`
//       );
//       throw new ApiError(
//         403,
//         'You are not authorized.Only super admin can perform this action.'
//       );
//     }
//   }
// );
