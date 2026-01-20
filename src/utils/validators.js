import { body, param, query, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  next();
};

// Auth validators
export const authValidators = {
  register: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('role').isIn(['student', 'teacher', 'admin']),
  ],
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  forgotPassword: [
    body('email').isEmail().normalizeEmail(),
  ],
  resetPassword: [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
  ],
};

// User validators
export const userValidators = {
  updateProfile: [
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('phone').optional().trim(),
    body('languagePreference').optional().isIn(['en', 'sw']),
  ],
};

// Course validators
export const courseValidators = {
  create: [
    body('titleEn').trim().notEmpty().withMessage('English title is required'),
    body('titleSw').trim().notEmpty().withMessage('Swahili title is required'),
    body('descriptionEn').trim().notEmpty(),
    body('descriptionSw').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('level').isIn(['beginner', 'intermediate', 'advanced']),
    body('price').isFloat({ min: 0 }),
    body('instructorId').trim().notEmpty(),
  ],
  update: [
    body('titleEn').optional().trim(),
    body('titleSw').optional().trim(),
    body('descriptionEn').optional().trim(),
    body('descriptionSw').optional().trim(),
    body('price').optional().isFloat({ min: 0 }),
  ],
};

// Assignment validators
export const assignmentValidators = {
  create: [
    body('titleEn').trim().notEmpty(),
    body('titleSw').trim().notEmpty(),
    body('descriptionEn').trim().notEmpty(),
    body('descriptionSw').trim().notEmpty(),
    body('dueDate').isISO8601(),
    body('maxScore').isInt({ min: 1 }),
  ],
};

// Exam validators
export const examValidators = {
  create: [
    body('title').trim().notEmpty(),
    body('courseId').trim().notEmpty(),
    body('type').isIn(['test', 'midterm', 'final']),
    body('scheduledDate').isISO8601(),
    body('duration').isInt({ min: 1 }),
    body('passingScore').isInt({ min: 0, max: 100 }),
  ],
};

// Ticket validators
export const ticketValidators = {
  purchase: [
    body('examId').trim().notEmpty(),
    body('quantity').isInt({ min: 1, max: 10 }),
    body('venueId').trim().notEmpty(),
  ],
};

// Payment validators
export const paymentValidators = {
  initiate: [
    body('amount').isFloat({ min: 100 }).withMessage('Minimum amount is 100 TZS'),
    body('method').isIn(['mpesa', 'airtel', 'tigo']),
    body('phoneNumber').matches(/^(\+?255|0)[0-9]{9}$/),
    body('description').trim().notEmpty(),
  ],
  callback: [
    body('transactionId').trim().notEmpty(),
    body('status').isIn(['success', 'failed', 'pending']),
  ],
};

// Message validators
export const messageValidators = {
  send: [
    body('recipientId').trim().notEmpty(),
    body('content').trim().notEmpty().isLength({ min: 1, max: 5000 }),
  ],
  broadcast: [
    body('content').trim().notEmpty(),
    body('filters').optional().isObject(),
  ],
};

// Notification validators
export const notificationValidators = {
  send: [
    body('userId').trim().notEmpty(),
    body('type').isIn(['assignment', 'exam', 'class', 'grade', 'payment', 'announcement']),
    body('content').trim().notEmpty(),
  ],
};

// Check-in validators
export const checkInValidators = {
  verify: [
    body('qrData').trim().notEmpty(),
    body('venueId').trim().notEmpty(),
    body('teacherId').trim().notEmpty(),
  ],
};

// Application validators
export const applicationValidators = {
  studentApplication: [
    body('highSchoolName').trim().notEmpty(),
    body('graduationYear').isInt({ min: 1990, max: new Date().getFullYear() }),
    body('preferredCourses').optional().isArray(),
  ],
  teacherApplication: [
    body('qualifications').trim().notEmpty(),
    body('experience').isInt({ min: 0 }),
    body('subjects').isArray({ min: 1 }),
  ],
};

// Venue validators
export const venueValidators = {
  create: [
    body('name').trim().notEmpty(),
    body('address').trim().notEmpty(),
    body('city').trim().notEmpty(),
    body('region').trim().notEmpty(),
    body('gpsLatitude').isFloat({ min: -90, max: 90 }),
    body('gpsLongitude').isFloat({ min: -180, max: 180 }),
    body('contactPhone').trim().notEmpty(),
    body('capacity').isInt({ min: 10 }),
  ],
};
