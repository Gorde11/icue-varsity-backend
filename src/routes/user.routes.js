import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { userValidators, validate } from '../utils/validators.js';

const router = express.Router();

/**
 * GET /api/users/me
 * Get current authenticated user profile
 */
router.get('/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    // TODO: Fetch user from database
    // const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: {
        id: userId,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        phone: '+255XXX',
        languagePreference: 'en',
        createdAt: new Date(),
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * PUT /api/users/me
 * Update current user profile
 */
router.put('/me',
  authenticate,
  userValidators.updateProfile,
  validate,
  asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { firstName, lastName, phone, languagePreference } = req.body;

    // TODO: Update user in database
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { firstName, lastName, phone, languagePreference },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: userId,
        firstName,
        lastName,
        phone,
        languagePreference,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * PUT /api/users/me/change-password
 * Change user password
 */
router.put('/me/change-password',
  authenticate,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // TODO: Verify current password and update new password
    // const user = await User.findById(userId);
    // const isValid = await comparePassword(currentPassword, user.password);
    // if (!isValid) return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    // const hashedPassword = await hashPassword(newPassword);
    // await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/users/:id
 * Get user profile by ID (Admin only)
 */
router.get('/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch user from database
    // const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: 'User retrieved',
      data: {
        id,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        status: 'active',
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * PUT /api/users/:id
 * Update user (Admin only)
 */
router.put('/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // TODO: Update user in database
    // const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { id, ...updates },
      note: 'Database integration pending',
    });
  })
);

/**
 * DELETE /api/users/:id
 * Deactivate/delete user (Admin only)
 */
router.delete('/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Soft delete or deactivate user in database
    // await User.findByIdAndUpdate(id, { status: 'deactivated' });

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/users
 * List all users (Admin only) with pagination and filters
 */
router.get('/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, role, status, search } = req.query;

    // TODO: Fetch users from database with filters
    // const users = await User.find({ role, status, $or: [{ firstName: search }, { email: search }] })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Users retrieved',
      data: [
        {
          id: 'user-1',
          email: 'student@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'student',
          status: 'active',
        },
      ],
      pagination: {
        currentPage: page,
        limit,
        total: 100,
        pages: Math.ceil(100 / limit),
      },
      note: 'Database integration pending',
    });
  })
);

export default router;
