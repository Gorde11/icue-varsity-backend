import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { messageValidators, validate } from '../utils/validators.js';
import { io } from '../server.js';

const router = express.Router();

/**
 * GET /api/messages/inbox
 * Get user's inbox messages
 */
router.get('/inbox',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { page = 1, limit = 10, unreadOnly = false } = req.query;

    // TODO: Fetch messages from database
    // const messages = await Message.find({ recipientId: userId, ...(unreadOnly && { read_status: false }) })
    //   .sort({ timestamp: -1 })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Inbox retrieved',
      data: [
        {
          id: 'msg-1',
          senderId: 'teacher-1',
          senderName: 'Jane Smith',
          senderRole: 'teacher',
          subject: 'Assignment Feedback',
          content: 'Great work on your last assignment!',
          timestamp: new Date(),
          readStatus: false,
        },
      ],
      pagination: {
        currentPage: page,
        limit,
        total: 20,
        pages: 2,
      },
      unreadCount: 5,
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/messages/sent
 * Get user's sent messages
 */
router.get('/sent',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;

    // TODO: Fetch sent messages from database
    // const messages = await Message.find({ senderId: userId })
    //   .sort({ timestamp: -1 })
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      message: 'Sent messages retrieved',
      data: [
        {
          id: 'msg-1',
          recipientId: 'student-1',
          recipientName: 'John Doe',
          recipientRole: 'student',
          content: 'Please review your assignment before submission',
          timestamp: new Date(),
          readStatus: true,
        },
      ],
      pagination: {
        currentPage: page,
        limit,
        total: 50,
        pages: 5,
      },
      note: 'Database integration pending',
    });
  })
);

/**
 * POST /api/messages/send
 * Send direct message to user
 */
router.post('/send',
  authenticate,
  messageValidators.send,
  validate,
  asyncHandler(async (req, res) => {
    const { recipientId, content, subject } = req.body;
    const senderId = req.user.userId;

    // TODO: Create message in database
    // const message = await Message.create({
    //   senderId,
    //   recipientId,
    //   subject,
    //   content,
    //   timestamp: new Date(),
    //   read_status: false,
    // });

    // TODO: Emit real-time notification via Socket.io
    // io.to(recipientId).emit('new-message', {
    //   messageId: message._id,
    //   senderName,
    //   content,
    //   timestamp: new Date(),
    // });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        messageId: 'msg-1',
        senderId,
        recipientId,
        content,
        timestamp: new Date(),
        status: 'sent',
      },
      note: 'Real-time Socket.io integration pending',
    });
  })
);

/**
 * POST /api/messages/broadcast
 * Send broadcast message to multiple recipients (Admin)
 */
router.post('/broadcast',
  authenticate,
  authorize('admin'),
  messageValidators.broadcast,
  validate,
  asyncHandler(async (req, res) => {
    const { content, subject, filters } = req.body;

    // TODO: Apply filters to find recipient users
    // Example filters: year_group, gender, course_enrollment, payment_status, etc.
    // const recipients = await User.find(filters);

    // TODO: Create broadcast message records
    // const broadcastMessages = recipients.map(user => ({
    //   senderId: req.user.userId,
    //   recipientId: user._id,
    //   subject,
    //   content,
    //   timestamp: new Date(),
    //   isBroadcast: true,
    // }));
    // await Message.insertMany(broadcastMessages);

    // TODO: Emit real-time notifications
    // recipients.forEach(user => {
    //   io.to(user._id).emit('broadcast-message', { subject, content });
    // });

    res.status(201).json({
      success: true,
      message: 'Broadcast message sent',
      data: {
        broadcastId: `bcast-${Date.now()}`,
        recipientsCount: 150,
        subject,
        timestamp: new Date(),
        filters,
      },
      note: 'Database and Socket.io integration pending',
    });
  })
);

/**
 * PUT /api/messages/:id/read
 * Mark message as read
 */
router.put('/:id/read',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Update message read_status in database
    // await Message.findByIdAndUpdate(id, { read_status: true });

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      messageId: id,
      note: 'Database integration pending',
    });
  })
);

/**
 * DELETE /api/messages/:id
 * Delete message
 */
router.delete('/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Soft delete or hard delete from database
    // await Message.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Message deleted',
      messageId: id,
      note: 'Database integration pending',
    });
  })
);

/**
 * GET /api/messages/:id
 * Get specific message details
 */
router.get('/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Fetch message from database
    // const message = await Message.findById(id);

    res.status(200).json({
      success: true,
      message: 'Message retrieved',
      data: {
        id,
        senderId: 'teacher-1',
        senderName: 'Jane Smith',
        recipientId: 'student-1',
        subject: 'Assignment Feedback',
        content: 'Great work on your last assignment!',
        timestamp: new Date(),
        readStatus: true,
      },
      note: 'Database integration pending',
    });
  })
);

export default router;
