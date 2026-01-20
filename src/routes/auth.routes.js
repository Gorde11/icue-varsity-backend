import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { 
  authValidators, 
  validate 
} from '../utils/validators.js';
import {
  generateToken,
  generateRefreshToken,
  hashPassword,
  comparePassword,
  generateOTP,
} from '../utils/auth.utils.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user (Student, Teacher, or Admin)
 * NOTE: Database operation will be added in Phase 7
 */
router.post('/register', 
  authValidators.register,
  validate,
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, role, phone } = req.body;

    // TODO: Check if user already exists in database
    // const existingUser = await User.findOne({ email });

    // TODO: Hash password
    const hashedPassword = await hashPassword(password);

    // TODO: Create user in database
    // const user = await User.create({
    //   email,
    //   password: hashedPassword,
    //   firstName,
    //   lastName,
    //   phone,
    //   role,
    //   languagePreference: 'en',
    //   emailVerificationToken: generateOTP(),
    //   emailVerificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   createdAt: new Date(),
    // });

    // Generate tokens
    const token = generateToken(email, role); // Use ID when DB is ready
    const refreshToken = generateRefreshToken(email, role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      data: {
        email,
        role,
        firstName,
        lastName,
        token,
        refreshToken,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/auth/login
 * User login
 */
router.post('/login',
  authValidators.login,
  validate,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // TODO: Find user in database
    // const user = await User.findOne({ email });

    // TODO: Compare password with hash
    // const isPasswordValid = await comparePassword(password, user.password);

    // Placeholder implementation
    const user = {
      id: 'user-123',
      email,
      role: 'student',
      firstName: 'Test',
      lastName: 'User',
    };

    const isPasswordValid = true; // Replace with actual comparison

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
        refreshToken,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout',
  authenticate,
  asyncHandler(async (req, res) => {
    // TODO: Invalidate refresh token in database

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  })
);

/**
 * POST /api/auth/refresh-token
 * Refresh access token
 */
router.post('/refresh-token',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // TODO: Verify refresh token from database
    // const decoded = verifyToken(refreshToken);

    const decoded = {
      userId: 'user-123',
      role: 'student',
    };

    const newToken = generateToken(decoded.userId, decoded.role);

    res.status(200).json({
      success: true,
      message: 'Token refreshed',
      data: {
        token: newToken,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post('/forgot-password',
  authValidators.forgotPassword,
  validate,
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    // TODO: Find user and generate reset token
    // const user = await User.findOne({ email });
    // const resetToken = generateOTP();
    // await User.updateOne(
    //   { email },
    //   { 
    //     passwordResetToken: resetToken,
    //     passwordResetExpiry: new Date(Date.now() + 60 * 60 * 1000),
    //   }
    // );

    // TODO: Send reset token via email

    res.status(200).json({
      success: true,
      message: 'Password reset token sent to email',
      note: 'Email and database integration pending',
    });
  })
);

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password',
  authValidators.resetPassword,
  validate,
  asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    // TODO: Verify token and update password
    // const user = await User.findOne({
    //   passwordResetToken: token,
    //   passwordResetExpiry: { $gt: new Date() },
    // });

    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid or expired reset token',
    //   });
    // }

    const hashedPassword = await hashPassword(newPassword);

    // TODO: Update password in database
    // await User.updateOne(
    //   { _id: user._id },
    //   { 
    //     password: hashedPassword,
    //     passwordResetToken: null,
    //     passwordResetExpiry: null,
    //   }
    // );

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/auth/verify-email
 * Verify email with OTP
 */
router.post('/verify-email',
  asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    // TODO: Find user and verify OTP
    // const user = await User.findOne({
    //   email,
    //   emailVerificationToken: otp,
    //   emailVerificationExpiry: { $gt: new Date() },
    // });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      note: 'Database integration pending',
    });
  })
);

export default router;
