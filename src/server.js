import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import examRoutes from './routes/exam.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import checkInRoutes from './routes/checkin.routes.js';
import messageRoutes from './routes/message.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import venueRoutes from './routes/venue.routes.js';
import applicationRoutes from './routes/application.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';
import { requestLogger } from './middleware/logger.middleware.js';

const app = express();
const server = http.createServer(app);

// Socket.io configuration
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Store connected users
export const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('user-online', (userId) => {
    connectedUsers.set(userId, socket.id);
    io.emit('user-status', { userId, status: 'online' });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of connectedUsers) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        io.emit('user-status', { userId, status: 'offline' });
        break;
      }
    }
  });
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'ICUE Varsity College API is running',
    timestamp: new Date(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/check-ins', checkInRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 ICUE Varsity College API running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
