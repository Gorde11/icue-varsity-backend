import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { assignmentValidators, validate } from '../utils/validators.js';

const router = express.Router();

/**
 * GET /api/assignments
 * Get assignments for a course or module
 */
router.get('/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { courseId, moduleId, page = 1, limit = 10 } = req.query;

    // TODO: Fetch assignments from database
    // const assignments = await Assignment.find({ courseId, moduleId })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Assignments retrieved',
      data: [
        {
          id: 'assignment-1',
          title: 'Build a Static Website',
          titleEn: 'Build a Static Website',
          titleSw: 'Jenga Wavuti wa Tuli',
          description: 'Create a simple static website',
          descriptionEn: 'Create a simple static website',
          descriptionSw: 'Jenga wavuti rahisi isiyobadilika',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          maxScore: 100,
          courseId,
          moduleId,
        },
      ],
      pagination: {
        currentPage: page,
        limit,
        total: 5,
        pages: 1,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/assignments
 * Create assignment (Teacher or Admin)
 */
router.post('/',
  authenticate,
  authorize('teacher', 'admin'),
  assignmentValidators.create,
  validate,
  asyncHandler(async (req, res) => {
    const {
      titleEn,
      titleSw,
      descriptionEn,
      descriptionSw,
      dueDate,
      maxScore,
      moduleId,
      courseId,
    } = req.body;

    // TODO: Create assignment in database
    // const assignment = await Assignment.create({
    //   titleEn,
    //   titleSw,
    //   descriptionEn,
    //   descriptionSw,
    //   dueDate,
    //   maxScore,
    //   moduleId,
    //   courseId,
    //   createdAt: new Date(),
    // });

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: {
        id: 'assignment-1',
        titleEn,
        titleSw,
        dueDate,
        maxScore,
        status: 'draft',
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/assignments/:id
 * Get assignment details
 */
router.get('/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch assignment from database
    // const assignment = await Assignment.findById(id);

    res.status(200).json({
      success: true,
      message: 'Assignment retrieved',
      data: {
        id,
        title: 'Build a Static Website',
        titleEn: 'Build a Static Website',
        titleSw: 'Jenga Wavuti wa Tuli',
        description: 'Create a simple static website',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxScore: 100,
        submissions: 25,
        graded: 20,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/assignments/:id/submit
 * Submit assignment (Student)
 */
router.post('/:id/submit',
  authenticate,
  authorize('student'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fileUrl, content } = req.body;
    const studentId = req.user.userId;

    // TODO: Create submission in database
    // const submission = await Submission.create({
    //   assignmentId: id,
    //   studentId,
    //   fileUrl,
    //   content,
    //   submittedAt: new Date(),
    //   status: 'pending',
    // });

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: {
        submissionId: 'submission-1',
        assignmentId: id,
        studentId,
        submittedAt: new Date(),
        status: 'pending_review',
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * PUT /api/assignments/:id/grade
 * Grade assignment submission (Teacher)
 */
router.put('/:id/grade',
  authenticate,
  authorize('teacher', 'admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { submissionId, grade, feedback } = req.body;

    // TODO: Update submission grade in database
    // const graded = await Submission.findByIdAndUpdate(
    //   submissionId,
    //   { grade, feedback, gradedAt: new Date(), status: 'graded' },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: 'Assignment graded successfully',
      data: {
        submissionId,
        grade,
        feedback,
        gradedAt: new Date(),
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/assignments/:id/submissions
 * Get all submissions for assignment (Teacher)
 */
router.get('/:id/submissions',
  authenticate,
  authorize('teacher', 'admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // TODO: Fetch submissions from database
    // const submissions = await Submission.find({ assignmentId: id })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Submissions retrieved',
      data: [
        {
          id: 'submission-1',
          studentName: 'John Doe',
          studentId: 'student-1',
          submittedAt: new Date(),
          status: 'pending_review',
          fileUrl: '/uploads/submission-1.pdf',
        },
      ],
      pagination: {
        currentPage: page,
        limit,
        total: 25,
        pages: 3,
      },
      note: 'Database integration pending',
    });
  })
);

export default router;
