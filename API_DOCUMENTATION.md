# IT Center Backend API Documentation

## Overview

This is a comprehensive API documentation for the IT Center Backend built with NestJS, featuring authentication, user management, courses, content management, reservations, and more.

**Base URL**: `http://localhost:5100` (development)

## Table of Contents

1. [Authentication](#authentication)
2. [Password Reset Flow](#password-reset-flow)
3. [User Management](#user-management)
4. [Content Management](#content-management)
5. [Course Management](#course-management)
6. [Reservations](#reservations)
7. [Registration Records](#registration-records)
8. [Reserve Records](#reserve-records)
9. [Notifications](#notifications)
10. [Feedbacks](#feedbacks)
11. [Profiles](#profiles)
12. [Payments](#payments)
13. [Email Services](#email-services)
14. [File Uploads](#file-uploads)
15. [Authentication & Authorization](#authentication--authorization)
16. [Error Handling](#error-handling)

---

## Password Reset Flow

The password reset feature provides a secure way for users to reset their passwords when they forget them. The flow consists of two main steps:

### Step 1: Request Password Reset

When a user forgets their password, they can request a password reset by providing their email address.

**Process:**
1. User submits their email address via the forgot password endpoint
2. System checks if the email exists in the database
3. If email exists, a unique reset token is generated and stored with an expiration time (1 hour)
4. An email is sent to the user with a reset link containing the token
5. The system always returns the same response for security (doesn't reveal if email exists)

### Step 2: Reset Password

The user receives an email with a reset link and can use it to set a new password.

**Process:**
1. User clicks the reset link or manually enters the token
2. User provides the token and their new password
3. System validates the token and checks if it hasn't expired
4. If valid, the password is updated and the reset token is cleared
5. A confirmation email is sent to the user
6. User can now log in with the new password

### Security Features

- **Token Expiration**: Reset tokens expire after 1 hour
- **One-time Use**: Tokens are cleared after successful password reset
- **Email Verification**: Reset links are only sent to registered email addresses
- **No Information Disclosure**: System doesn't reveal if an email exists
- **Secure Token Generation**: Uses cryptographically secure random tokens
- **Password Hashing**: New passwords are properly hashed before storage
- **Password Validation**: Enforces strong password requirements
- **Logging**: All password reset attempts are logged for security monitoring

### Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- Special characters are allowed but not required

### Rate Limiting Recommendations

For production deployment, consider implementing rate limiting on the forgot password endpoint to prevent abuse:

- **Per IP**: Maximum 5 requests per hour
- **Per Email**: Maximum 3 requests per hour
- **Global**: Consider implementing global rate limits during high traffic

### Example Flow

```
1. POST /auth/forgot-password
   Body: { "email": "user@example.com" }
   
2. [User receives email with reset link]
   
3. POST /auth/reset-password
   Body: { 
     "token": "abc123...",
     "newPassword": "newSecurePassword123"
   }
   
4. [User receives confirmation email]
```

---

## Authentication

### Sign In

**POST** `/auth/signin`

Sign in with email and password.

**Request Body:**

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "STUDENT"
  }
}
```

### Sign Up

**POST** `/auth/signup`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "hashedPassword": "hashed_password",
  "image": "https://example.com/image.jpg" // optional
}
```

### Google Authentication

**GET** `/auth/google/sign`

Initiate Google OAuth sign-in.

**GET** `/auth/google/callback`

Google OAuth callback endpoint.

### Refresh Token

**POST** `/auth/refresh`

**Headers:**

```
Authorization: Bearer <refresh_token>
```

**Response:**

```json
{
  "access_token": "new_jwt_access_token"
}
```

### Logout

**POST** `/auth/logout`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Forgot Password

**POST** `/auth/forgot-password`

Request a password reset for a user account.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

**Note:** For security reasons, this endpoint always returns the same message regardless of whether the email exists in the system or not.

### Reset Password

**POST** `/auth/reset-password`

Reset password using the token received via email.

**Request Body:**

```json
{
  "token": "reset_token_from_email",
  "newPassword": "new_secure_password"
}
```

**Response:**

```json
{
  "message": "Password has been reset successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Invalid or expired reset token
- `400 Bad Request`: Password validation failed

---

## User Management

### Get All Users (Admin Only)

**GET** `/user/`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get Own Profile

**GET** `/user/me`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Get All Students (Admin Only)

**GET** `/user/student`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get Own Student Info (Student Only)

**GET** `/user/student/me`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** STUDENT

### Get Student Info by ID (Admin Only)

**GET** `/user/student/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get All Staff Members

**GET** `/user/staff`

No authentication required.

### Get Own Staff Info (Staff Only)

**GET** `/user/staff/me`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** STAFF

### Get All Admins (Super Admin Only)

**GET** `/user/admin`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

### Convert User to Student

**POST** `/user/convert/student`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** USER

**Request Body:** CreateStudentProfileDto (see Profiles section)

### Convert User to Staff (Admin Only)

**POST** `/user/convert/staff`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "requestBy": "user_id"
}
```

### Convert Staff to Admin (Super Admin Only)

**POST** `/user/convert/admin`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

**Request Body:**

```json
{
  "requestId": "staff_id"
}
```

### Convert Admin to Super Admin (Super Admin Only)

**POST** `/user/convert/super-admin`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

**Request Body:**

```json
{
  "requestId": "admin_id"
}
```

### Demote Staff to User (Super Admin Only)

**POST** `/user/demote/staff`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

**Request Body:**

```json
{
  "requestId": "staff_id"
}
```

### Upload Profile Image

**POST** `/user/upload-img`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**

- `user`: Image file (max 5MB, images only)

**Response:**

```json
{
  "message": "Files uploaded successfully",
  "path": "/path/to/uploaded/image.jpg"
}
```

### Change Password

**PUT** `/user/password`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "current": "current_password",
  "new": "new_password"
}
```

### Update Profile

**PUT** `/user/`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Delete Own Account

**DELETE** `/user/`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Delete User Account (Admin Only)

**DELETE** `/user/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get User Statistics (Admin Only)

**GET** `/user/stats`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

---

## Content Management

### Get All Logs

**GET** `/contents/logs`

### Get All Projects

**GET** `/contents/projects`

### Get All News

**GET** `/contents/news`

### Get Content by ID

**GET** `/contents/:id`

### Create Log

**POST** `/contents/logs`

**Request Body:**

```json
{
  "title": "Log Title",
  "description": "Log description",
  "date": "2025-01-01T00:00:00.000Z", // optional
  "images": ["image1.jpg", "image2.jpg"], // optional
  "time": "14:30:00", // optional, HH:mm:ss format
  "venue": "Venue Name" // optional
}
```

### Create Project

**POST** `/contents/projects`

**Request Body:** Same as Create Log

### Create News

**POST** `/contents/news`

**Request Body:** Same as Create Log

### Update Content

**PUT** `/contents/:id`

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Content

**DELETE** `/contents/:id`

### Upload Content Files

**POST** `/contents/upload`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**

- `content`: Image files (max 5 files, 5MB each, images only)

**Response:**

```json
{
  "message": "Files uploaded successfully",
  "paths": ["/path/to/image1.jpg", "/path/to/image2.jpg"]
}
```

---

## Course Management

### Get All Courses

**GET** `/courses`

### Get Course Statistics (Admin Only)

**GET** `/courses/stats`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get Course by ID

**GET** `/courses/:id`

### Create Course (Admin Only)

**POST** `/courses`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "courseName": "Python Programming",
  "courseCode": "PY101",
  "description": "Learn Python programming from basics",
  "duration": "3 months",
  "registrationDeadline": "2025-02-01", // optional
  "fees": 15000,
  "audience": "Beginners",
  "instructor": "John Doe", // optional
  "images": ["course1.jpg", "course2.jpg"], // optional
  "studentLimit": 30, // optional
  "registered": 0, // optional
  "startingDate": "2025-02-15", // optional
  "endingDate": "2025-05-15" // optional
}
```

### Update Course (Admin Only)

**PATCH** `/courses/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:** Same structure as Create Course (partial updates allowed)

### Delete Course (Admin Only)

**DELETE** `/courses/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Upload Course Files (Admin Only)

**POST** `/courses/upload`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Roles Required:** ADMIN

**Form Data:**

- `course`: Image files (max 5 files, 5MB each, images only)

**Response:**

```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "course-123456789-123456789.jpg",
      "path": "/path/to/course-image.jpg",
      "size": 245760,
      "type": "image/jpeg"
    }
  ]
}
```

---

## Reservations

### Create Reservation (Admin Only)

**POST** `/reservations`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "name": "Conference Room A",
  "description": "Large conference room with projector",
  "images": ["room1.jpg", "room2.jpg"],
  "seatLimit": 50,
  "noOfComputers": 0, // optional
  "availableSoftwares": "None", // optional
  "equipment": "Projector, Whiteboard, Sound System",
  "isAC": true,
  "bestCase": "Presentations, Meetings", // optional
  "location": "Second Floor, Building A",
  "charges": 5000,
  "isAvailable": true
}
```

### Get All Reservations

**GET** `/reservations`

### Get Reservation by ID

**GET** `/reservations/:id`

### Get Reservation with Records

**GET** `/reservations/:id/records`

### Update Reservation (Admin Only)

**PUT** `/reservations/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:** Same structure as Create Reservation (partial updates allowed)

### Delete Reservation (Admin Only)

**DELETE** `/reservations/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Upload Reservation Files (Admin Only)

**POST** `/reservations/upload`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Roles Required:** ADMIN

**Form Data:**

- `reservation`: Image files (max 5 files, 5MB each, images only)

**Response:**

```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "reservation-123456789-123456789.jpg",
      "path": "/path/to/reservation-image.jpg",
      "size": 189432,
      "type": "image/jpeg"
    }
  ]
}
```

---

## Registration Records

### Create Registration Record

**POST** `/registration-records`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "studentId": "student_uuid",
  "courseId": "course_uuid",
  "batch": "Batch A", // optional
  "status": "PENDING", // optional: PENDING, APPROVED, REJECTED, COMPLETED
  "result": "A", // optional: A, B, C, S, F
  "paymentDate": "2025-01-01T00:00:00.000Z" // optional
}
```

### Get All Registration Records (Admin Only)

**GET** `/registration-records`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get User's Registration Records (Student Only)

**GET** `/registration-records/user`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** STUDENT

### Get All Requests Course-wise (Admin Only)

**GET** `/registration-records/requests`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get Registration Record by ID

**GET** `/registration-records/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Update Registration Record

**PATCH** `/registration-records/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "status": "APPROVED",
  "batch": "Batch B",
  "result": "A"
}
```

### Bulk Approve Records (Admin Only)

**PUT** `/registration-records/all/approve`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "courseId": "course_uuid",
  "status": "PENDING"
}
```

### Bulk Complete Records (Admin Only)

**PUT** `/registration-records/all/complete`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "courseId": "course_uuid",
  "status": "APPROVED",
  "batch": "Batch A"
}
```

### Delete Registration Record

**DELETE** `/registration-records/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

---

## Reserve Records

### Create Reserve Record

**POST** `/reserve-records`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "reservationId": "reservation_uuid",
  "startTime": "2025-01-01T10:00:00.000Z",
  "endTime": "2025-01-01T12:00:00.000Z",
  "purpose": "Team meeting"
}
```

### Get All Reserve Records

**GET** `/reserve-records`

### Get All Pending Reserve Records

**GET** `/reserve-records/pending`

### Get All Not Ended Reserve Records

**GET** `/reserve-records/not-ended`

### Get User's Reserve Records

**GET** `/reserve-records/me`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Get Reserve Records by Reservation ID

**GET** `/reserve-records/reservation/:id`

### Update Reserve Record

**PATCH** `/reserve-records/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "status": "APPROVED",
  "startTime": "2025-01-01T11:00:00.000Z"
}
```

### Delete Reserve Record

**DELETE** `/reserve-records/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

---

## Notifications

### Create Notification for User (Admin Only)

**POST** `/notifications/user`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "sender": "ADMIN", // ADMIN, SYSTEM, USER
  "subject": "Important Notice",
  "content": "This is an important notification",
  "userId": "target_user_uuid"
}
```

### Create Notification for All Users (Admin Only)

**POST** `/notifications/all`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:**

```json
{
  "sender": "ADMIN",
  "subject": "General Notice",
  "content": "This notification is for all users"
}
```

### Create Notification for All Students (Admin Only)

**POST** `/notifications/allStudents`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:** Same as above

### Create Notification for All Teachers (Admin Only)

**POST** `/notifications/allTeachers`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

**Request Body:** Same as above

### Get User's Notifications

**GET** `/notifications`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Get Unread Notifications

**GET** `/notifications/unread`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Mark Notification as Read

**PATCH** `/notifications/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Mark All Notifications as Read

**PUT** `/notifications/all`

**Headers:**

```
Authorization: Bearer <access_token>
```

### Delete Notification

**DELETE** `/notifications/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

---

## Feedbacks

### Create Feedback

**POST** `/feedbacks`

**Request Body:**

```json
{
  "email": "user@example.com",
  "description": "This is my feedback about the service"
}
```

### Create Consultation Request

**POST** `/feedbacks/consultation`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I would like to schedule a consultation"
}
```

### Get All Feedbacks (Admin Only)

**GET** `/feedbacks`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Get All Consultation Requests (Admin Only)

**GET** `/feedbacks/consultation`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Delete Feedback (Admin Only)

**DELETE** `/feedbacks/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

### Delete Consultation Request (Admin Only)

**DELETE** `/feedbacks/consultation/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

---

## Profiles

### Student Profile

#### Get All Student Profiles (Super Admin Only)

**GET** `/student-profile/all`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

#### Create Student Profile (Super Admin Only)

**POST** `/student-profile`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

**Request Body:**

```json
{
  "title": "MR", // MR, MRS, MISS, DR, PROF
  "fullName": "John Doe",
  "nameWithInitials": "J. Doe",
  "address": "123 Main St, City",
  "telephone": "+1234567890",
  "whatsapp": "+1234567890",
  "nic": "123456789V",
  "dateOfBirth": "1990-01-01",
  "age": 35,
  "gender": "MALE", // MALE, FEMALE, OTHER
  "religion": "Christianity",
  "ethnicity": "Sinhala",
  "civilStatus": "SINGLE", // SINGLE, MARRIED, DIVORCED, WIDOWED
  "emergencyContactName": "Jane Doe",
  "emergencyContactNumber": "+0987654321",
  "education": {
    "englishOL": "A", // Grade enum: A, B, C, S, F
    "mathematicsOL": "B",
    "scienceOL": "A",
    "aLevelResults": [
      {
        "subject": "Mathematics",
        "grade": "A"
      },
      {
        "subject": "Physics",
        "grade": "B"
      }
    ]
  },
  "higherEducation": {
    "FOQualification": "Bachelor of Science",
    "date": "2015-06-01"
  },
  "employmentDetails": {
    "currentEmployer": "ABC Company",
    "designation": "Software Engineer",
    "yearsOfExperience": 5
  }
}
```

#### Update Student Profile (Super Admin Only)

**PATCH** `/student-profile/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

#### Delete Student Profile (Super Admin Only)

**DELETE** `/student-profile/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** S_ADMIN

### Staff Profile

#### Create Staff Request (User Only)

**POST** `/staff-profile`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** USER

**Request Body:**

```json
{
  "title": "MR",
  "fullName": "John Doe",
  "nameWithInitials": "J. Doe",
  "address": "123 Main St, City",
  "telephone": "+1234567890",
  "whatsapp": "+1234567890",
  "nic": "123456789V",
  "dateOfBirth": "1990-01-01",
  "age": 35,
  "gender": "MALE",
  "religion": "Christianity",
  "ethnicity": "Sinhala",
  "civilStatus": "SINGLE",
  "emergencyContactName": "Jane Doe",
  "emergencyContactNumber": "+0987654321",
  "qualifications": "Bachelor of Computer Science, Master of Education",
  "experience": "5 years teaching experience",
  "specialization": "Web Development, Database Management"
}
```

#### Get All Staff Profiles

**GET** `/staff-profile`

#### Get All Staff Profiles (Approved Only)

**GET** `/staff-profile/profile`

#### Get All Staff Requests (Admin Only)

**GET** `/staff-profile/requests`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

#### Get Staff Profile by ID

**GET** `/staff-profile/:id`

#### Update Staff Profile (Staff Only)

**PATCH** `/staff-profile/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** STAFF

#### Delete Staff Profile/Request (Admin Only)

**DELETE** `/staff-profile/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Roles Required:** ADMIN

---

## Payments

### Initiate Payment

**POST** `/payment/initiate`

**Request Body:**

```json
{
  "recaptchaToken": "recaptcha_token",
  "recordId": "registration_record_uuid",
  "type": "COURSE" // or "RESERVATION"
}
```

**Response:**

```json
{
  "paymentUrl": "https://payment-gateway.com/pay/12345",
  "paymentId": "payment_12345",
  "amount": 15000
}
```

---

## Email Services

### Send Test Email

**POST** `/mail/test`

**Request Body:**

```json
{
  "email": "test@example.com"
}
```

**Response:**

```json
{
  "message": "Confirmation email sent"
}
```

---

## File Uploads

### General Upload Configuration

- **Max File Size**: 5MB per file
- **Allowed File Types**: Images only (jpg, jpeg, png, gif)
- **Max Files**: Varies by endpoint (1-5 files)

### Upload Endpoints Summary

| Endpoint               | Field Name    | Max Files | Auth Required | Role Required          |
| ---------------------- | ------------- | --------- | ------------- | ---------------------- |
| `/contents/upload`     | `content`     | 5         | Yes           | Any authenticated user |
| `/courses/upload`      | `course`      | 5         | Yes           | ADMIN                  |
| `/reservations/upload` | `reservation` | 5         | Yes           | ADMIN                  |
| `/user/upload-img`     | `user`        | 1         | Yes           | Any authenticated user |

### Upload Response Format

```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "generated_filename.jpg",
      "path": "/path/to/uploaded/file.jpg",
      "size": 245760,
      "type": "image/jpeg"
    }
  ]
}
```

---

## Authentication & Authorization

### JWT Token Structure

- **Access Token**: Used for API requests (shorter lifespan)
- **Refresh Token**: Used to generate new access tokens (longer lifespan)

### User Roles

- **USER**: Basic user role
- **STUDENT**: Student role with course access
- **STAFF**: Staff member role
- **ADMIN**: Administrative privileges
- **S_ADMIN**: Super admin with highest privileges

### Role Hierarchy

```
S_ADMIN > ADMIN > STAFF > STUDENT > USER
```

### Headers Required

```
Authorization: Bearer <access_token>
Content-Type: application/json (for JSON requests)
Content-Type: multipart/form-data (for file uploads)
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

#### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

#### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

#### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

#### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

### File Upload Errors

#### No Files Uploaded

```json
{
  "statusCode": 400,
  "message": "No files uploaded",
  "error": "Bad Request"
}
```

#### File Too Large

```json
{
  "statusCode": 400,
  "message": "File too large",
  "error": "Bad Request"
}
```

#### Invalid File Type

```json
{
  "statusCode": 400,
  "message": "Only image files are allowed!",
  "error": "Bad Request"
}
```

---

## Development Information

### Environment Variables Required

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_NAME=it_center

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
REFRESH_JWT_SECRET=your_refresh_jwt_secret
REFRESH_JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# CORS
CORS_ORIGIN=http://localhost:3000

# Server
PORT=5100
NODE_ENV=development
```

### Starting the Server

```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Build
npm run build
```

### API Testing

You can test the API using:

- Postman
- Insomnia
- curl commands
- Any REST client

### Static File Access

Uploaded files can be accessed via:

```
GET /uploads/{directory}/{filename}
```

Example:

```
GET /uploads/users/user-1234567890-123456789.jpg
GET /uploads/contents/content-1234567890-987654321.png
```

---

## Support

For any issues or questions regarding the API, please contact the development team or create an issue in the project repository.

**Version**: 0.0.1  
**Last Updated**: January 2025
