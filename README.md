# ICUE Varsity College Backend API

A comprehensive REST API for ICUE Varsity College, an online education platform designed for the Tanzanian market with bilingual support (English/Swahili), mobile money payments, and hybrid exam delivery.

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start development server
npm run dev

# Start production server
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── server.js              # Express server setup
│   ├── config/                # Configuration files
│   ├── controllers/           # Business logic (Phase 7)
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── logger.middleware.js
│   ├── models/                # Database models (Phase 7 - SQL)
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── course.routes.js
│   │   ├── enrollment.routes.js
│   │   ├── assignment.routes.js
│   │   ├── exam.routes.js
│   │   ├── ticket.routes.js
│   │   ├── payment.routes.js
│   │   ├── checkin.routes.js
│   │   ├── message.routes.js
│   │   ├── notification.routes.js
│   │   ├── venue.routes.js
│   │   └── application.routes.js
│   └── utils/
│       ├── auth.utils.js
│       ├── payment.utils.js
│       ├── qr-pdf.utils.js
│       └── validators.js
├── package.json
├── .env.example
└── README.md
```

## API Endpoints Overview

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh-token` - Refresh access token
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /verify-email` - Verify email with OTP

### User Routes (`/api/users`)
- `GET /me` - Get current user profile
- `PUT /me` - Update current user profile
- `PUT /me/change-password` - Change password
- `GET /:id` - Get user by ID (Admin)
- `PUT /:id` - Update user (Admin)
- `DELETE /:id` - Deactivate user (Admin)
- `GET /` - List all users (Admin)

### Course Routes (`/api/courses`)
- `GET /` - Get all courses (public)
- `GET /:id` - Get course details (public)
- `POST /` - Create course (Admin/Teacher)
- `PUT /:id` - Update course (Admin/Teacher)
- `DELETE /:id` - Delete course (Admin)
- `POST /:id/modules` - Add module to course
- `GET /:id/modules` - Get course modules

### Enrollment Routes (`/api/enrollments`)
- `POST /` - Enroll in course (Student)
- `GET /` - Get user's enrollments
- `GET /:id` - Get enrollment details
- `PUT /:id/progress` - Update course progress
- `POST /:id/complete` - Mark course complete
- `DELETE /:id` - Unenroll from course

### Assignment Routes (`/api/assignments`)
- `GET /` - Get assignments for course
- `POST /` - Create assignment (Teacher)
- `GET /:id` - Get assignment details
- `POST /:id/submit` - Submit assignment (Student)
- `PUT /:id/grade` - Grade assignment (Teacher)
- `GET /:id/submissions` - Get submissions (Teacher)

### Exam Routes (`/api/exams`)
- `GET /` - Get all exams
- `POST /` - Create exam (Teacher)
- `GET /:id` - Get exam details
- `GET /:id/questions` - Get exam questions
- `POST /:id/take` - Take exam (Student)
- `GET /:id/results` - Get exam results
- `POST /:id/question` - Add exam question

### Ticket Routes (`/api/tickets`)
- `GET /available` - Get available tickets
- `POST /purchase` - Purchase tickets
- `GET /my-tickets` - Get student's tickets
- `GET /:id` - Get ticket details
- `POST /:id/download-pdf` - Download ticket PDF
- `GET /` - List all tickets (Admin)

### Payment Routes (`/api/payments`)
- `POST /initiate` - Initiate mobile money payment
- `POST /callback` - Webhook for payment confirmation
- `GET /history` - Get payment history (User)
- `GET /:id` - Get payment details
- `GET /admin/all` - Get all payments (Admin)

### Check-in Routes (`/api/check-ins`)
- `POST /verify` - Verify ticket QR code
- `POST /manual` - Manual check-in
- `GET /logs` - Get check-in logs
- `GET /exam/:examId` - Get exam attendance report
- `GET /venue/:venueId` - Get venue check-ins

### Message Routes (`/api/messages`)
- `GET /inbox` - Get inbox messages
- `GET /sent` - Get sent messages
- `POST /send` - Send direct message
- `POST /broadcast` - Send broadcast (Admin)
- `PUT /:id/read` - Mark message as read
- `DELETE /:id` - Delete message
- `GET /:id` - Get message details

### Notification Routes (`/api/notifications`)
- `GET /` - Get notifications
- `PUT /:id/read` - Mark as read
- `POST /read-all` - Mark all as read
- `POST /send` - Send notification (Admin)
- `POST /broadcast` - Broadcast notification (Admin)
- `DELETE /:id` - Delete notification
- `GET /preferences` - Get preferences
- `PUT /preferences` - Update preferences

### Venue Routes (`/api/venues`)
- `GET /` - Get all venues (searchable by location)
- `GET /:id` - Get venue details
- `POST /` - Create venue (Admin)
- `PUT /:id` - Update venue (Admin)
- `DELETE /:id` - Delete venue (Admin)
- `GET /:id/exams` - Get exams at venue
- `GET /:id/check-ins` - Get venue check-ins

### Application Routes (`/api/applications`)
- `POST /student` - Submit student application
- `GET /student/my-application` - Get student's application
- `POST /teacher` - Submit teacher application
- `GET /teacher/my-application` - Get teacher's application
- `GET /` - Get all applications (Admin)
- `PUT /:id/approve` - Approve application (Admin)
- `PUT /:id/reject` - Reject application (Admin)
- `GET /:id` - Get application details

## Key Features

### ✅ Implemented
- Full REST API endpoint structure with 80+ endpoints
- JWT authentication with refresh token support
- Role-based access control (Admin, Teacher, Student)
- Input validation using express-validator
- Error handling middleware
- Real-time communication setup (Socket.io)
- Logger middleware for request tracking
- Mobile money payment gateway placeholders
- QR code generation and PDF creation utilities
- Bilingual support (English/Swahili) in responses

### 🔄 Pending Database Integration (Phase 7)
- PostgreSQL database connection
- Prisma or Sequelize ORM setup
- User, Course, Exam, Ticket, Payment models
- Database migrations
- Data persistence for all operations

### 🔄 Pending External Integrations (Phase 7)
- M-Pesa, Airtel Money, Tigo Pesa payment APIs
- WooCommerce REST API for ticketing
- Firebase Cloud Messaging for push notifications
- AWS S3 for file storage
- SendGrid for email notifications
- Zoom SDK for virtual classes

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

### User Roles

- **Student**: Can enroll in courses, submit assignments, take exams, purchase tickets
- **Teacher**: Can create courses, upload content, grade assignments, manage exams
- **Admin**: Full platform access, user management, reporting, payment management

## Environment Variables

See `.env.example` for all available configuration options.

### Required for Development
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT signing
- `FRONTEND_URL` - Frontend URL for CORS

### Required for Production
- All payment API keys (M-Pesa, Airtel, Tigo)
- AWS S3 credentials
- SendGrid API key
- Firebase configuration
- Database credentials

## Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Run linting
npm run lint

# Fix linting errors
npm run lint:fix

# Run tests
npm test

# Watch tests
npm run test:watch

# Start production server
npm start
```

## API Response Format

All endpoints return consistent JSON responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { },
  "pagination": { },
  "note": "Database integration pending"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [],
  "status": 400,
  "timestamp": "2024-01-20T00:00:00.000Z"
}
```

## Bilingual Support

All endpoints support English and Swahili. Content fields include:
- `titleEn` / `titleSw`
- `descriptionEn` / `descriptionSw`
- `contentEn` / `contentSw`

Client can request preferred language via `language_preference` query parameter.

## Real-time Features

Socket.io is configured for:
- Real-time messages
- Notification delivery
- User online/offline status
- Live exam updates

## File Uploads

The API supports file uploads for:
- Course videos and materials
- Assignment submissions
- User photos and documents
- Payment receipts

Files are validated and stored in `/uploads` directory.

## Security Features

- JWT-based authentication
- Password hashing (bcryptjs)
- Input validation and sanitization
- SQL injection prevention (via ORM - Phase 7)
- XSS protection
- CORS configuration
- Rate limiting (ready for implementation)
- Helmet.js for HTTP headers security

## Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Deployment

### Prerequisites
- Node.js 16+
- PostgreSQL database
- Redis instance
- Mobile money merchant accounts

### Steps
1. Set up environment variables
2. Install dependencies: `npm install`
3. Run database migrations (Phase 7)
4. Start server: `npm start`
5. Set up SSL certificate (production)
6. Configure reverse proxy (nginx/Apache)

## Documentation

- **API Documentation**: See endpoint details above
- **Database Schema**: See ICUE Varsity College - Comprehensive Business Plan.md (Phase 7)
- **Authentication Flow**: JWT with refresh tokens
- **Payment Flow**: Mobile money integration guide
- **Mobile App Integration**: Uses same API endpoints

## Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database exists

### Payment Integration Issues
- Verify API keys in .env
- Check payment gateway sandbox/production mode
- Test with test credentials first

## Support

For issues, questions, or contributions, please refer to the main project documentation.

## License

MIT License - See LICENSE file

## Next Steps (Phase 7-8)

1. **Phase 7: Database Integration**
   - Set up PostgreSQL database
   - Create Prisma schemas
   - Implement all database operations
   - Run migrations
   - Seed test data

2. **Phase 8: External API Integration**
   - Integrate payment gateways
   - Connect WooCommerce
   - Set up Firebase notifications
   - Configure AWS S3
   - Integrate email service

3. **Deployment & Testing**
   - Write comprehensive tests
   - Set up CI/CD pipeline
   - Performance optimization
   - Security audit
   - Production deployment

---

**Current Status**: Phase 1-6 Complete ✅  
**Endpoints Ready for Connection**: 80+ fully documented endpoints  
**Database Ready**: Awaiting Phase 7 implementation  
**Next Phase**: SQL Database & ORM Setup
