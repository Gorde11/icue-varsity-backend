import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { examValidators, validate } from '../utils/validators.js';

const router = express.Router();

/**
 * GET /api/exams
 * Get all exams with filters
 */
router.get('/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { courseId, page = 1, limit = 10, type, status } = req.query;

    // TODO: Fetch exams from database
    // const exams = await Exam.find({ courseId, type, status })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Exams retrieved',
      data: [
        {
          id: 'exam-1',
          title: 'Web Development Quiz',
          courseId,
          type: 'test',
          scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          duration: 60,
          totalQuestions: 20,
          passingScore: 70,
          status: 'published',
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
 * POST /api/exams
 * Create new exam (Teacher or Admin)
 */
router.post('/',
  authenticate,
  authorize('teacher', 'admin'),
  examValidators.create,
  validate,
  asyncHandler(async (req, res) => {
    const {
      title,
      courseId,
      type,
      scheduledDate,
      duration,
      passingScore,
    } = req.body;

    // TODO: Create exam in database
    // const exam = await Exam.create({
    //   title,
    //   courseId,
    //   type,
    //   scheduledDate,
    //   duration,
    //   passingScore,
    //   createdAt: new Date(),
    // });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      data: {
        id: 'exam-1',
        title,
        courseId,
        type,
        scheduledDate,
        duration,
        passingScore,
        status: 'draft',
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/exams/:id
 * Get exam details
 */
router.get('/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch exam from database
    // const exam = await Exam.findById(id);

    res.status(200).json({
      success: true,
      message: 'Exam retrieved',
      data: {
        id,
        title: 'Web Development Quiz',
        description: 'Test your web development knowledge',
        courseId: 'course-1',
        type: 'test',
        scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        duration: 60,
        passingScore: 70,
        totalAttempts: 3,
        status: 'published',
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/exams/:id/questions
 * Get exam questions for taking exam
 */
router.get('/:id/questions',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch questions from database
    // const questions = await Question.find({ examId: id });

    res.status(200).json({
      success: true,
      message: 'Exam questions retrieved',
      data: [
        {
          id: 'question-1',
          type: 'multiple_choice',
          question: 'What is HTML?',
          questionSw: 'HTML ni nini?',
          options: [
            'A markup language',
            'A programming language',
            'A database',
            'A server software',
          ],
          marks: 1,
        },
      ],
      totalQuestions: 20,
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/exams/:id/take
 * Student takes exam and submits answers
 */
router.post('/:id/take',
  authenticate,
  authorize('student'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { answers, timeTaken } = req.body;
    const studentId = req.user.userId;

    // TODO: Save exam attempt and calculate score
    // const attempt = await ExamAttempt.create({
    //   examId: id,
    //   studentId,
    //   answers,
    //   timeTaken,
    //   submittedAt: new Date(),
    // });
    // Calculate score and store

    res.status(201).json({
      success: true,
      message: 'Exam submitted successfully',
      data: {
        attemptId: 'attempt-1',
        examId: id,
        studentId,
        score: 85,
        passingScore: 70,
        result: 'PASS',
        timeTaken,
        submittedAt: new Date(),
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/exams/:id/results
 * Get exam results (Student or Teacher)
 */
router.get('/:id/results',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch exam results from database
    // const results = await ExamAttempt.find({ examId: id });

    res.status(200).json({
      success: true,
      message: 'Exam results retrieved',
      data: [
        {
          studentId: 'student-1',
          studentName: 'John Doe',
          score: 85,
          passingScore: 70,
          result: 'PASS',
          submittedAt: new Date(),
        },
      ],
      classAverage: 78,
      passRate: 0.85,
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/exams/:id/question
 * Add question to exam (Teacher)
 */
router.post('/:id/question',
  authenticate,
  authorize('teacher', 'admin'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, question, questionSw, options, correctAnswer, marks } = req.body;

    // TODO: Create question in database
    // const newQuestion = await Question.create({
    //   examId: id,
    //   type,
    //   question,
    //   questionSw,
    //   options,
    //   correctAnswer,
    //   marks,
    // });

    res.status(201).json({
      success: true,
      message: 'Question added to exam',
      data: {
        questionId: 'question-1',
        examId: id,
        type,
        marks,
      },
      note: 'Database integration pending',
    });
  })
);

export default router;
