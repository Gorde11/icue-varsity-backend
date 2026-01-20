# ICUE Varsity College API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### JWT Token Structure
```json
{
  "userId": "user-123",
  "role": "student|teacher|admin",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Login Flow
1. User calls `POST /auth/login` with email and password
2. Server returns `token` and `refreshToken`
3. Client stores tokens and includes Bearer token in subsequent requests
4. When token expires, use `POST /auth/refresh-token` with refreshToken
5. Get new access token and continue

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid auth |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error |

## Error Handling

All errors return consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "status": 400,
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

---

## Detailed Endpoint Documentation

### 1. AUTHENTICATION ENDPOINTS

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+255XXXXXXXXX",
  "role": "student" | "teacher"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "email": "user@example.com",
    "role": "student",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword123"
}
```

---

### 2. COURSE ENDPOINTS

#### Get All Courses
```http
GET /courses?page=1&limit=10&category=IT&level=beginner&language=en&minPrice=0&maxPrice=100000&search=web
```

**Query Parameters**
- `page` (int) - Page number for pagination
- `limit` (int) - Items per page
- `category` (string) - Filter by course category
- `level` (string) - beginner | intermediate | advanced
- `language` (string) - Course language availability
- `minPrice` (number) - Minimum course price
- `maxPrice` (number) - Maximum course price
- `search` (string) - Search in title/description
- `language_preference` (string) - en | sw

**Response (200)**
```json
{
  "success": true,
  "message": "Courses retrieved",
  "data": [
    {
      "id": "course-1",
      "titleEn": "Web Development Basics",
      "titleSw": "Misingi ya Ujambazi wa Web",
      "description": "Learn web development fundamentals",
      "category": "IT",
      "level": "beginner",
      "price": 50000,
      "instructorName": "Jane Smith",
      "studentCount": 150,
      "rating": 4.5,
      "language_available": ["en", "sw"]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Get Course Details
```http
GET /courses/:id
```

#### Create Course (Teacher/Admin)
```http
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "titleEn": "Web Development Basics",
  "titleSw": "Misingi ya Ujambazi wa Web",
  "descriptionEn": "Learn the fundamentals",
  "descriptionSw": "Jifunze misingi",
  "category": "IT",
  "level": "beginner",
  "price": 50000,
  "instructorId": "teacher-1",
  "language_available": ["en", "sw"]
}
```

#### Add Module to Course
```http
POST /courses/:id/modules
Authorization: Bearer <token>
Content-Type: application/json

{
  "titleEn": "HTML Basics",
  "titleSw": "Misingi ya HTML",
  "contentEn": "Detailed content...",
  "contentSw": "Maudhui kwa Kiswahili...",
  "duration": 120,
  "videoUrl": "https://example.com/video.mp4",
  "order": 1
}
```

---

### 3. ENROLLMENT ENDPOINTS

#### Enroll in Course
```http
POST /enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course-1"
}
```

#### Get My Enrollments
```http
GET /enrollments?page=1&limit=10&status=in_progress
Authorization: Bearer <token>
```

#### Update Course Progress
```http
PUT /enrollments/:enrollmentId/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "moduleId": "module-1",
  "watched": true,
  "progressPercentage": 45
}
```

#### Mark Course Complete
```http
POST /enrollments/:enrollmentId/complete
Authorization: Bearer <token>
```

---

### 4. ASSIGNMENT ENDPOINTS

#### Get Assignments
```http
GET /assignments?courseId=course-1&moduleId=module-1&page=1&limit=10
Authorization: Bearer <token>
```

#### Create Assignment (Teacher)
```http
POST /assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "titleEn": "Build a Static Website",
  "titleSw": "Jenga Wavuti wa Tuli",
  "descriptionEn": "Create a simple website",
  "descriptionSw": "Jenga wavuti rahisi",
  "dueDate": "2024-02-15T23:59:59Z",
  "maxScore": 100,
  "courseId": "course-1",
  "moduleId": "module-1"
}
```

#### Submit Assignment (Student)
```http
POST /assignments/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileUrl": "https://storage.example.com/submission.pdf",
  "content": "Optional text submission"
}
```

#### Grade Assignment (Teacher)
```http
PUT /assignments/:id/grade
Authorization: Bearer <token>
Content-Type: application/json

{
  "submissionId": "submission-1",
  "grade": 85,
  "feedback": "Great work! Very well structured code."
}
```

#### Get Submissions (Teacher)
```http
GET /assignments/:id/submissions?page=1&limit=10
Authorization: Bearer <token>
```

---

### 5. EXAM ENDPOINTS

#### Get Exams
```http
GET /exams?courseId=course-1&page=1&limit=10&type=test&status=published
Authorization: Bearer <token>
```

#### Create Exam (Teacher)
```http
POST /exams
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Web Development Final Exam",
  "courseId": "course-1",
  "type": "final",
  "scheduledDate": "2024-02-20T09:00:00Z",
  "duration": 120,
  "passingScore": 70,
  "totalQuestions": 50
}
```

#### Get Exam Questions
```http
GET /exams/:id/questions
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "message": "Exam questions retrieved",
  "data": [
    {
      "id": "question-1",
      "type": "multiple_choice",
      "question": "What is HTML?",
      "questionSw": "HTML ni nini?",
      "options": [
        "A markup language",
        "A programming language",
        "A database",
        "A server software"
      ],
      "marks": 1
    }
  ],
  "totalQuestions": 50
}
```

#### Take Exam (Student)
```http
POST /exams/:id/take
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "questionId": "question-1",
      "answer": "A markup language",
      "selectedOption": 0
    }
  ],
  "timeTaken": 118
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Exam submitted successfully",
  "data": {
    "attemptId": "attempt-1",
    "score": 85,
    "passingScore": 70,
    "result": "PASS",
    "percentage": 85,
    "submittedAt": "2024-02-20T11:00:00Z"
  }
}
```

#### Get Exam Results (Teacher)
```http
GET /exams/:id/results
Authorization: Bearer <token>
```

---

### 6. TICKET ENDPOINTS

#### Get Available Tickets
```http
GET /tickets/available?courseId=course-1&examId=exam-1&page=1&limit=10
```

**Response**
```json
{
  "success": true,
  "message": "Available tickets retrieved",
  "data": [
    {
      "id": "ticket-type-1",
      "examId": "exam-1",
      "examName": "Web Development Final Exam",
      "courseId": "course-1",
      "price": 25000,
      "quantity": 50,
      "examDate": "2024-02-20T09:00:00Z",
      "venue": "Dar es Salaam High School",
      "venueId": "venue-1"
    }
  ]
}
```

#### Purchase Tickets (Student)
```http
POST /tickets/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "examId": "exam-1",
  "quantity": 1,
  "venueId": "venue-1"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Ticket purchase initiated",
  "data": {
    "orderId": "order-1234567890",
    "totalAmount": 25000,
    "status": "pending_payment",
    "paymentUrl": "/api/payments/initiate"
  }
}
```

#### Get My Tickets (Student)
```http
GET /tickets/my-tickets?page=1&limit=10&status=active
Authorization: Bearer <token>
```

#### Get Ticket Details
```http
GET /tickets/:id
Authorization: Bearer <token>
```

---

### 7. PAYMENT ENDPOINTS

#### Initiate Payment
```http
POST /payments/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25000,
  "method": "mpesa",
  "phoneNumber": "+255700123456",
  "description": "Exam Ticket Purchase",
  "orderId": "order-123"
}
```

**Response**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "transactionId": "TXN-1234567890",
    "status": "PENDING",
    "method": "mpesa",
    "amount": 25000,
    "instruction": "Please complete payment on your M-Pesa account"
  }
}
```

#### Payment Webhook (Mobile Money Provider)
```http
POST /payments/callback
Content-Type: application/json

{
  "transactionId": "TXN-1234567890",
  "status": "success",
  "amount": 25000,
  "method": "mpesa",
  "externalId": "external-txn-id"
}
```

#### Get Payment History (User)
```http
GET /payments/history?page=1&limit=10&status=COMPLETED
Authorization: Bearer <token>
```

#### Get All Payments (Admin)
```http
GET /payments/admin/all?page=1&limit=10&method=mpesa&status=COMPLETED
Authorization: Bearer <admin-token>
```

---

### 8. CHECK-IN ENDPOINTS

#### Verify Ticket QR Code (Teacher)
```http
POST /check-ins/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "qrData": "{\"ticketId\":\"ticket-1\",\"studentId\":\"student-1\"}",
  "venueId": "venue-1",
  "teacherId": "teacher-1"
}
```

**Response**
```json
{
  "success": true,
  "message": "Student checked in successfully",
  "data": {
    "studentId": "student-1",
    "studentName": "John Doe",
    "examName": "Web Development Final Exam",
    "checkInTime": "2024-02-20T09:05:00Z",
    "status": "CHECKED_IN"
  }
}
```

#### Manual Check-in (Teacher)
```http
POST /check-ins/manual
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student-1",
  "ticketId": "ticket-1",
  "venueId": "venue-1",
  "examId": "exam-1"
}
```

#### Get Check-in Logs (Teacher)
```http
GET /check-ins/logs?examId=exam-1&venueId=venue-1&page=1&limit=10
Authorization: Bearer <token>
```

#### Get Exam Attendance Report
```http
GET /check-ins/exam/:examId
Authorization: Bearer <token>
```

---

### 9. MESSAGE ENDPOINTS

#### Get Inbox
```http
GET /messages/inbox?page=1&limit=10&unreadOnly=false
Authorization: Bearer <token>
```

#### Send Message
```http
POST /messages/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "user-2",
  "subject": "Assignment Feedback",
  "content": "Great work on your assignment!"
}
```

#### Broadcast Message (Admin)
```http
POST /messages/broadcast
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "subject": "New Course Available",
  "content": "Check out our new Web Development course!",
  "filters": {
    "role": "student",
    "yearGroup": 1,
    "gender": "all"
  }
}
```

#### Mark Message as Read
```http
PUT /messages/:id/read
Authorization: Bearer <token>
```

---

### 10. NOTIFICATION ENDPOINTS

#### Get Notifications
```http
GET /notifications?page=1&limit=10&unreadOnly=false&type=assignment
Authorization: Bearer <token>
```

#### Send Notification (Admin)
```http
POST /notifications/send
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "student-1",
  "type": "assignment",
  "title": "Assignment Due Soon",
  "titleSw": "Maapu Inakuja Haraka",
  "content": "Your assignment is due in 24 hours"
}
```

#### Broadcast Notification (Admin)
```http
POST /notifications/broadcast
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "type": "announcement",
  "title": "System Maintenance",
  "content": "Platform will be under maintenance tomorrow",
  "filters": {
    "yearGroup": [1, 2, 3],
    "courses": ["course-1", "course-2"]
  },
  "schedule": "immediate" | "2024-02-20T22:00:00Z"
}
```

#### Get Notification Preferences
```http
GET /notifications/preferences
Authorization: Bearer <token>
```

#### Update Notification Preferences
```http
PUT /notifications/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "categories": {
    "assignment": true,
    "exam": true,
    "class": false
  },
  "channels": {
    "push": true,
    "email": true,
    "sms": false
  },
  "quietHours": {
    "enabled": true,
    "startTime": "22:00",
    "endTime": "08:00"
  }
}
```

---

### 11. VENUE ENDPOINTS

#### Get Venues (Location Search)
```http
GET /venues?latitude=-6.7924&longitude=39.2083&radius=50&city=Dar%20es%20Salaam&page=1&limit=10
```

#### Get Venue Details
```http
GET /venues/:id
```

#### Create Venue (Admin)
```http
POST /venues
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Dar es Salaam High School",
  "address": "Plot 123, Dar es Salaam",
  "city": "Dar es Salaam",
  "region": "Dar es Salaam",
  "gpsLatitude": -6.7924,
  "gpsLongitude": 39.2083,
  "contactPhone": "+255XXXXXXXXX",
  "contactEmail": "venue@example.com",
  "contactPerson": "Mr. John Smith",
  "capacity": 100,
  "facilities": ["WiFi", "Air Conditioning", "Parking"]
}
```

#### Get Exams at Venue
```http
GET /venues/:id/exams?page=1&limit=10
```

#### Get Venue Check-ins
```http
GET /venues/:id/check-ins?page=1&limit=10
Authorization: Bearer <token>
```

---

### 12. APPLICATION ENDPOINTS

#### Submit Student Application
```http
POST /applications/student
Authorization: Bearer <token>
Content-Type: application/json

{
  "highSchoolName": "Arusha High School",
  "graduationYear": 2020,
  "form4ResultsUrl": "https://storage.example.com/form4.pdf",
  "form6ResultsUrl": "https://storage.example.com/form6.pdf",
  "photoUrl": "https://storage.example.com/photo.jpg",
  "preferredCourses": ["IT", "Business"]
}
```

#### Get My Student Application
```http
GET /applications/student/my-application
Authorization: Bearer <student-token>
```

#### Submit Teacher Application
```http
POST /applications/teacher
Authorization: Bearer <token>
Content-Type: application/json

{
  "qualifications": "BSc Computer Science",
  "experience": 5,
  "subjects": ["Web Development", "Programming"],
  "cvUrl": "https://storage.example.com/cv.pdf",
  "certificatesUrl": ["https://storage.example.com/cert1.pdf"],
  "teachingSampleUrl": "https://storage.example.com/sample.mp4"
}
```

#### Get All Applications (Admin)
```http
GET /applications?page=1&limit=10&type=student&status=pending&dateFrom=2024-01-01&dateTo=2024-02-20
Authorization: Bearer <admin-token>
```

#### Approve Application (Admin)
```http
PUT /applications/:id/approve
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "notes": "Application approved. Welcome to ICUE!"
}
```

#### Reject Application (Admin)
```http
PUT /applications/:id/reject
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "reason": "Incomplete documentation",
  "notes": "Please resubmit with complete form 4 results"
}
```

---

## Rate Limiting (Ready for Implementation)

The API includes rate limiting configuration ready for deployment:
- 15 requests per 15 minutes per IP
- Higher limits for authenticated users
- Custom limits for sensitive endpoints

## CORS Configuration

Allowed origins from `FRONTEND_URL` environment variable:
```
http://localhost:3000 (development)
https://yourdomain.com (production)
```

Allowed methods: GET, POST, PUT, DELETE, OPTIONS
Allowed headers: Content-Type, Authorization

## Pagination

All list endpoints support pagination:
```
?page=1&limit=10
```

Default limit: 10
Maximum limit: 100

## Filtering and Search

Supported on:
- Courses: category, level, language, price range, search
- Enrollments: status
- Exams: course, type, status
- Users: role, status, search
- Applications: type, status, date range

## Real-time Features

WebSocket events via Socket.io:
- `new-message` - New message received
- `notification` - New notification
- `user-status` - User online/offline
- `exam-update` - Exam status changes

## File Upload Endpoints

For file uploads, use multipart/form-data:
```http
POST /courses/:id/modules
Authorization: Bearer <token>
Content-Type: multipart/form-data

videoFile: <binary>
title: "Module Title"
```

## Testing with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get courses
curl -X GET "http://localhost:5000/api/courses?page=1&limit=10" \

# Enroll in course (authenticated)
curl -X POST http://localhost:5000/api/enrollments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"courseId":"course-1"}'
```

---

## Version History

- **v1.0** (Current) - Initial API launch with 80+ endpoints
- Phase 7 (Upcoming) - Database integration
- Phase 8 (Upcoming) - Payment gateway integration

---

For more information, see the main README.md and project documentation.
