# Test User Accounts & Credentials

## Overview
This document provides test user accounts for different roles in the Bhanuprakash platform. Use these for development, testing, and QA.

---

## Test User Accounts

### Super Admin
**Purpose:** Full platform access, user management, system settings  
**Email:** `admin@example.com`  
**Password:** `TestPass123!`  
**Stripe Customer ID:** (Use test card below)

**Permissions:**
- Create, update, delete users
- Manage all courses
- View analytics
- System settings
- User reports

---

### Instructor #1
**Purpose:** Create and manage courses, upload content  
**Email:** `instructor@example.com`  
**Password:** `TestPass123!`  
**Instructor ID:** `inst_001`  
**Stripe Connected Account:** (Setup in Stripe dashboard)

**Permissions:**
- Create and publish courses
- Upload course materials
- Create quizzes and MCQs
- View enrollment and revenue
- Student management

---

### Instructor #2 (Alternative)
**Purpose:** Secondary instructor for testing multi-instructor scenarios  
**Email:** `instructor2@example.com`  
**Password:** `TestPass123!`  
**Instructor ID:** `inst_002`

---

### Student #1
**Purpose:** Enroll in courses, take quizzes  
**Email:** `student@example.com`  
**Password:** `TestPass123!`  
**Student ID:** `stud_001`

**Permissions:**
- Browse and view courses
- Enroll in courses
- Watch lessons
- Take quizzes
- View progress
- Leave reviews

---

### Student #2 (Premium/Paid)
**Purpose:** Test paid course enrollment and subscription  
**Email:** `student-premium@example.com`  
**Password:** `TestPass123!`  
**Student ID:** `stud_002`  
**Subscription Status:** Active (test subscription)

---

## Test Payment Cards (Stripe)

**For Development/Testing Only (Stripe Test Mode)**

### Successful Payment
```
Card Number:    4242 4242 4242 4242
Expiry Date:    12 / 25 (any future date)
CVC:            123 (any 3 digits)
Name:           Test User
Result:         Payment succeeds
```

### Declined Payment
```
Card Number:    4000 0000 0000 0002
Expiry Date:    12 / 25
CVC:            123
Result:         Card declined
```

### Requires Authentication (3D Secure)
```
Card Number:    4000 0025 0000 3155
Expiry Date:    12 / 25
CVC:            123
Result:         Requires authentication popup
```

### Insufficient Funds
```
Card Number:    4000 0000 0000 9995
Expiry Date:    12 / 25
CVC:            123
Result:         Insufficient funds error
```

---

## Test Email Addresses

For local development, use temporary email services:
- **Mailtrap:** https://mailtrap.io (captures emails locally)
- **Mailbox.org:** https://mailbox.org (temporary emails)
- **10MinuteMail:** https://10minutemail.com (disposable emails)

**Configure in `.env.local`:**
```env
NODEMAILER_EMAIL=your-mailtrap-inbox@mailtrap.io
NODEMAILER_PASSWORD=your-mailtrap-password
```

---

## Signup Flow Testing

### Create New Student Account
```
1. Go to /login
2. Click "Sign Up"
3. Fill in:
   - Full Name: Test Student
   - Email: test-[timestamp]@example.com
   - Password: TestPass123!
   - Country: Select any
4. Verify email (check Mailtrap inbox)
5. Complete profile
```

### Create New Instructor Account
```
1. Go to /instructor-registration
2. Fill in:
   - Full Name: Test Instructor
   - Email: test-instructor-[timestamp]@example.com
   - Password: TestPass123!
   - Qualification: MD
   - Experience: 5 years
   - Country: Select any
3. Verify email
4. Setup Stripe Connect account (test mode)
5. Verify instructor account (admin approval)
```

---

## Role-Based Test Scenarios

### Scenario 1: Student Enrollment Journey
```
1. Login as student@example.com
2. Browse /courses
3. Click on a course
4. Click "Enroll Now"
5. Proceed to checkout
6. Use test card 4242 4242 4242 4242
7. Complete purchase
8. Verify enrollment in dashboard
```

### Scenario 2: Instructor Course Creation
```
1. Login as instructor@example.com
2. Go to /instructor-courses
3. Click "Create New Course"
4. Fill course details (title, description, price)
5. Add lessons and course content
6. Create quiz with MCQs
7. Publish course
8. Verify course appears in /courses
```

### Scenario 3: Student Quiz Attempt
```
1. Enroll in a course with quizzes
2. Complete lessons
3. Attempt quiz
4. Verify answers and explanations
5. Check progress tracking
6. View quiz report in dashboard
```

### Scenario 4: Payment Processing
```
1. Add course to cart
2. Proceed to checkout
3. Enter test card details
4. Complete payment
5. Verify Stripe webhook received
6. Verify enrollment created
7. Check invoice generated
```

---

## API Testing with cURL

### Get Auth Token (if using JWT)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "TestPass123!"
  }'
```

### List All Courses
```bash
curl -X GET http://localhost:3000/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Enroll in Course
```bash
curl -X POST http://localhost:3000/api/courses/[course-id]/enroll \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethodId": "pm_test_visa"
  }'
```

---

## Test Data Setup

### Create Test Courses (as Instructor)
```
1. Login as instructor@example.com
2. Create 3-5 test courses:
   - NEETPG Crash Course
   - FMGE Intensive Review
   - ECG Fundamentals
   - USMLE Step 1 Prep
   - NURSING Certification
```

### Add Sample Content
```
For each course:
- Add 5-10 lessons with descriptions
- Upload video links (YouTube or Cloudinary)
- Create 2-3 quizzes with 5-10 questions each
- Add explanations for correct/incorrect answers
- Set pricing ($29, $49, $99)
```

### Enroll Test Students
```
1. As student accounts, enroll in various courses
2. Take quizzes and track progress
3. Leave test reviews and ratings
4. Test wishlist functionality
```

---

## Monitoring Test Accounts

### Check Enrollment Status
- Admin Dashboard → Users → Select student
- Verify enrolled courses and progress

### Monitor Payment History
- Stripe Dashboard → Payments
- Filter by test cards (4242...)
- Verify webhook logs

### Review Email Logs
- Mailtrap Dashboard
- Check verification emails, password resets, etc.

### Check Cloudinary Uploads
- Cloudinary Dashboard → Media Library
- Verify test images and PDFs uploaded correctly

---

## Password Reset Testing

```
1. Go to /forgot-password
2. Enter: student@example.com
3. Check Mailtrap for reset link
4. Click reset link
5. Enter new password: NewPass123!
6. Login with new password
```

---

## Session Management Testing

### Test Login/Logout
```bash
# Login
curl -c cookies.txt -X POST http://localhost:3000/api/auth/login \
  -d "email=student@example.com&password=TestPass123!"

# Verify authenticated (using cookies)
curl -b cookies.txt http://localhost:3000/api/user/profile

# Logout
curl -b cookies.txt -X POST http://localhost:3000/api/auth/logout
```

### Test Multiple Sessions
```
1. Open incognito browser windows
2. Login with different test accounts
3. Verify session isolation
4. Switch between accounts without conflicts
```

---

## Security Testing

### Test Account Lockout
```
1. Login as student@example.com
2. Enter wrong password 5+ times
3. Verify account locked
4. Unlock via password reset email
```

### Test Permission Boundaries
```
1. Login as student@example.com
2. Try accessing /instructor-dashboard
3. Verify 403 Forbidden error
4. Repeat for admin-only routes
```

### Test CSRF Protection
```
1. Verify CSRF tokens in forms
2. Test POST requests with invalid tokens
3. Verify requests rejected
```

---

## Notes for QA Team

- **Password Policy:** Min 8 chars, 1 uppercase, 1 number, 1 special char
- **Session Timeout:** 30 days (configurable)
- **Rate Limiting:** 5 failed login attempts = 15 min lockout
- **Two-Factor Auth:** Optional (if configured)

---

## Cleanup After Testing

### Delete Test Accounts
```bash
# Via admin dashboard or direct SQL
DELETE FROM "User" WHERE email LIKE 'test-%@example.com';
DELETE FROM "User" WHERE email = 'student@example.com';
```

### Clear Test Data
```bash
# Preserve production-like data, clean up temporary records
DELETE FROM "CourseEnrollment" WHERE createdAt < CURRENT_DATE - INTERVAL '7 days';
```

---

## Support

For test account issues:
1. Check database connectivity
2. Verify email delivery (Mailtrap)
3. Check Stripe test mode enabled
4. Review application logs

---

**Last Updated:** January 8, 2026  
**Version:** 1.0
