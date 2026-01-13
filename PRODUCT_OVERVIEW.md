# Product Overview & Features

**Platform:** Bhanuprakash Medical Learning Platform  
**Type:** Full-Stack SaaS Educational Platform  
**Target Users:** Medical professionals, exam aspirants (NEETPG, FMGE, USMLE, etc.)

---

## Executive Summary

Bhanuprakash is a comprehensive medical exam preparation platform that connects instructors with students through interactive courses, quizzes, and progress tracking. The platform supports monetization via Stripe, content management, and instructor dashboards.

---

## Core Features

### 1. User Management

#### Student Features
- **Registration & Authentication**
  - Email-based signup
  - Email verification
  - Secure password management
  - Password reset via email
  - Profile creation and management

- **User Dashboard**
  - View enrolled courses
  - Track learning progress
  - Bookmark/save courses (wishlist)
  - Download certificates
  - View payment history

#### Instructor Features
- **Instructor Registration**
  - Professional qualification verification
  - Experience tracking
  - Specialization selection
  - Profile customization

- **Instructor Dashboard**
  - Course management (create, edit, publish)
  - Student enrollment tracking
  - Revenue monitoring
  - Performance analytics
  - Rating and reviews

#### Admin Features
- **Admin Panel**
  - User management
  - Course moderation
  - System settings
  - Analytics and reports

---

### 2. Course Management

#### Course Creation & Publishing
- **Course Setup**
  - Title, description, category
  - Course thumbnail (Cloudinary CDN)
  - Pricing (single price or tiered)
  - Difficulty level (beginner, intermediate, advanced)
  - Course objectives
  - Prerequisites

- **Course Organization**
  - Structured lessons/modules
  - Topic-based organization
  - Resource attachments (PDFs, files)
  - Video integration (YouTube, Cloudinary)

#### Course Browsing & Discovery
- **Student Course Discovery**
  - Browse by category (NEETPG, FMGE, USMLE, ECG, NURSING, PLAB)
  - Search functionality
  - Filter by level, price, rating
  - Featured courses carousel
  - Instructor profiles and ratings
  - Student reviews and ratings

#### Course Details Page
- Course preview
- Instructor bio and credentials
- Student count and rating
- Course content outline
- Pricing and enrollment button
- Related/similar courses
- Student testimonials

---

### 3. Learning Experience

#### Lesson Structure
- **Video Lessons**
  - Embedded YouTube player (plyr integration)
  - Cloudinary video support
  - Lesson descriptions and notes
  - Duration tracking
  - Resource downloads

- **Lesson Tracking**
  - Mark lesson as complete
  - Progress bar per course
  - Time spent per lesson
  - Overall completion percentage

#### Quiz & Assessment System
- **Quiz Configuration**
  - Multiple choice questions (MCQ)
  - True/False questions
  - Pass/fail scoring (configurable threshold)
  - Question shuffling (optional)
  - Retake policy (single attempt or multiple)
  - Time limits (optional)

- **Question Bank**
  - Question text and images
  - 4-option MCQs (A, B, C, D)
  - Detailed explanations with images
  - Difficulty levels (easy, medium, hard)
  - Topic tagging

- **Quiz Attempt**
  - Real-time timer (if configured)
  - Answer selection
  - Instant feedback (if enabled)
  - Detailed explanations after submission
  - Attempt history
  - Score tracking

- **Performance Analytics**
  - Quiz score history
  - Topic-wise performance
  - Comparison with course average
  - Weak area identification

---

### 4. Content Management

#### Blog System
- **Blog Posts**
  - Rich text editor (HTML support)
  - Featured image
  - Author attribution
  - Category and tags
  - Publication scheduling
  - View count tracking

- **Blog Discovery**
  - Blog listing page
  - Category filtering
  - Search functionality
  - Related posts
  - Author pages

#### Latest Videos
- Video metadata storage
- YouTube URL integration
- Cloudinary video support
- Auto-generated thumbnails
- View tracking

#### Curriculum Management
- **Subject-based Structure**
  - Subjects (e.g., Medicine, Surgery)
  - Chapters within subjects
  - Topics within chapters
  - Curriculum-course linking
  - Coverage tracking

---

### 5. Enrollment & Payment

#### Shopping Cart & Checkout
- **Shopping Features**
  - Add courses to cart
  - View cart contents
  - Remove courses
  - Apply discount codes (future)
  - Saved items (wishlist)

#### Payment Processing
- **Stripe Integration**
  - Secure checkout page
  - Test and live mode support
  - Payment method tokenization
  - Automatic invoice generation
  - Receipt emailing

- **Payment Records**
  - Transaction tracking
  - Payment status (pending, completed, failed)
  - Refund processing
  - Invoice history

#### Enrollment Management
- **Enrollment Process**
  1. Add course to cart
  2. Proceed to checkout
  3. Enter payment details
  4. Complete payment
  5. Instant course enrollment
  6. Access granted immediately

- **Enrollment Status**
  - Active enrollment
  - Completed courses
  - Dropped courses
  - Certificate issuance upon completion

---

### 6. Communication & Notifications

#### Email Notifications
- **Transactional Emails**
  - Welcome email (signup)
  - Email verification
  - Password reset
  - Enrollment confirmation
  - Payment receipt
  - Course expiration warnings

- **Marketing Emails** (optional)
  - New course announcements
  - Personalized course recommendations
  - Newsletter
  - Course progress reminders

#### Notification Channels
- Email via SendGrid or NodeMailer
- In-app notifications (future)
- SMS notifications (future)

---

### 7. Instructor Monetization

#### Revenue Management
- **Pricing Models**
  - One-time purchase
  - Subscription (future)
  - Tiered pricing (future)

- **Instructor Payouts**
  - Stripe Connect integration
  - Automatic fund transfer
  - Revenue split configuration
  - Tax documentation

---

## User Flows

### Flow 1: Student Registration & Enrollment

```
START
  ↓
User visits homepage
  ↓
Click "Sign Up" / "Register"
  ↓
Fill registration form (name, email, password, country)
  ↓
Submit registration
  ↓
Verification email sent
  ↓
User clicks email verification link
  ↓
Email verified
  ↓
Complete profile (optional bio, profile picture)
  ↓
Redirect to dashboard
  ↓
Browse courses
  ↓
Select course → View details
  ↓
Click "Enroll Now" or "Add to Cart"
  ↓
Proceed to checkout
  ↓
Enter payment details (Stripe)
  ↓
Complete payment
  ↓
Enrollment confirmed
  ↓
Access course → Watch lessons → Take quizzes
  ↓
Track progress in dashboard
  ↓
Complete course → Download certificate
  ↓
END
```

### Flow 2: Instructor Course Creation

```
START
  ↓
Instructor registers on platform
  ↓
Complete instructor profile (qualifications, experience)
  ↓
Setup Stripe Connect account
  ↓
Awaits admin verification
  ↓
Admin approves instructor
  ↓
Access instructor dashboard
  ↓
Click "Create New Course"
  ↓
Fill course details (title, description, category, price, thumbnail)
  ↓
Create course draft
  ↓
Add lessons/modules
  ↓
Upload lesson content (video URL, description, resources)
  ↓
Create quiz with questions
  ↓
Set passing score, retake policy
  ↓
Review and publish course
  ↓
Course appears in course listing
  ↓
Students can enroll
  ↓
Monitor enrollments and revenue
  ↓
END
```

### Flow 3: Student Quiz Attempt

```
START (Student enrolled in course)
  ↓
Complete required lessons
  ↓
Navigate to quiz section
  ↓
Click "Start Quiz"
  ↓
Quiz instructions displayed
  ↓
Timer starts (if configured)
  ↓
Student reads question
  ↓
Select option (A, B, C, D)
  ↓
Move to next question
  ↓
Repeat for all questions
  ↓
Click "Submit Quiz"
  ↓
Quiz auto-graded
  ↓
Results page shown (score, percentage, pass/fail)
  ↓
View detailed explanations
  ↓
Option to retake (if allowed)
  ↓
Performance recorded in database
  ↓
END
```

### Flow 4: Payment & Receipt

```
START (Student in checkout)
  ↓
Review cart contents
  ↓
Click "Proceed to Checkout"
  ↓
Stripe checkout modal opens
  ↓
Enter payment details:
   - Card number (4242 4242 4242 4242 for test)
   - Expiry date
   - CVC
   - Billing address
  ↓
Click "Pay"
  ↓
Stripe processes payment
  ↓
PaymentIntent confirmed
  ↓
Webhook received by platform
  ↓
Enrollment created
  ↓
Invoice generated
  ↓
Receipt email sent
  ↓
Student redirected to courses
  ↓
Access granted to enrolled course
  ↓
END
```

---

## Technology Stack

### Frontend
- **Framework:** Next.js 15.5.9 (React 18.3.x)
- **Styling:** SCSS, Bootstrap 5, Tailwind CSS
- **Components:** React Bootstrap, Custom React components
- **Icons:** react-icons (Font Awesome, Feather, Heroicons)
- **Forms:** react-hook-form, react-select
- **Animations:** GSAP, Framer Motion, AOS (Animate on Scroll)
- **PDF Viewer:** react-pdf with PDF.js
- **Video Player:** plyr (YouTube embeds), react-player

### Backend
- **API Framework:** Next.js API Routes (serverless)
- **ORM:** Prisma 6.19
- **Database:** PostgreSQL (Render)
- **Authentication:** NextAuth.js 4.24
- **Email:** SendGrid or NodeMailer
- **Payments:** Stripe (Checkout, Webhooks, Connect)
- **File Storage:** Cloudinary (Images, Videos, PDFs)
- **Encryption:** bcryptjs, crypto
- **Task Queue:** Node.js setTimeout (limited job scheduling)

### DevOps & Hosting
- **Hosting:** Render (PaaS)
- **Version Control:** GitHub
- **CI/CD:** Render auto-deploy on push
- **Database Backups:** Render automated + manual exports
- **CDN:** Cloudinary (images, videos)

### Development Tools
- **Build Tool:** Next.js built-in Webpack
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Package Manager:** npm

---

## Data Security

### Authentication
- JWT tokens via NextAuth
- Session management (default 30 days)
- Secure password hashing (bcryptjs)
- Email verification before account access

### Data Encryption
- SSL/TLS for all HTTP connections
- Stripe secrets encrypted in database (AES-256)
- Password encryption (bcryptjs)
- HTTPS enforced

### Payment Security
- PCI DSS compliance via Stripe
- No card data stored locally
- Webhook signature verification
- Test and live mode separation

### Access Control
- Role-based access (student, instructor, admin)
- Route protection via middleware
- Instructor-only endpoints
- Admin-only settings

---

## Performance Metrics

### Frontend Performance
- Next.js Image optimization (lazy loading, format conversion)
- Code splitting and dynamic imports
- CSS/SCSS bundling
- Font optimization (Google Fonts + local fallbacks)
- Bundle analysis available: `npm run analyze`

### Scalability
- Render autoscaling (based on dyno type)
- Database connection pooling (pgBouncer)
- CDN delivery via Cloudinary
- Pagination for large datasets

### Monitoring
- Build logs: Render Dashboard
- Database logs: Render PostgreSQL logs
- Payment logs: Stripe Dashboard
- Email delivery: SendGrid/Mailtrap

---

## Known Limitations & Future Enhancements

### Current Limitations
- Single-language (English only)
- No SMS notifications
- No offline learning mode
- No collaborative features (forums, Q&A)
- No mobile native apps
- Limited analytics dashboard

### Planned Enhancements
1. **Internationalization (i18n)** - Multi-language support
2. **Advanced Analytics** - Detailed course and student insights
3. **Mobile Apps** - Native iOS/Android applications
4. **Live Classes** - Video conferencing integration (Zoom, Jitsi)
5. **Gamification** - Badges, leaderboards, achievements
6. **AI-Powered Recommendations** - Personalized course suggestions
7. **Advanced Search** - Full-text search with Elasticsearch
8. **Social Learning** - Peer-to-peer learning features
9. **Subscription Model** - Monthly/yearly subscriptions
10. **Advanced Reporting** - Custom report generation

---

## Compliance & Legal

### Regulatory Compliance
- GDPR ready (data export, deletion)
- CCPA considerations
- FERPA compliance (education records)
- Payment Card Industry (PCI) compliance via Stripe

### Terms of Service
- [Create ToS document covering]:
  - User rights and responsibilities
  - Acceptable use policy
  - Intellectual property
  - Limitation of liability
  - Refund policy

### Privacy Policy
- [Create Privacy Policy covering]:
  - Data collection
  - Data usage
  - Third-party integrations
  - Cookie policy
  - Data retention

---

## Success Metrics & KPIs

### User Acquisition
- Monthly active users (MAU)
- Student registrations
- Instructor registrations
- User retention rate

### Course Performance
- Courses created
- Average enrollment per course
- Course completion rate
- Course rating (1-5 stars)

### Revenue Metrics
- Total revenue
- Average revenue per user (ARPU)
- Customer lifetime value (CLV)
- Payment success rate

### Engagement Metrics
- Quiz attempt rate
- Lesson completion rate
- Session duration
- Return user rate

---

## Support & Maintenance

### SLA (Service Level Agreement)
- **Uptime Target:** 99.9%
- **Response Time (P50):** < 200ms
- **Support Hours:** Business hours via email

### Issue Escalation
- Priority 1 (Critical): Production down - immediate response
- Priority 2 (High): Major feature broken - 2-hour response
- Priority 3 (Medium): Minor issue - 24-hour response
- Priority 4 (Low): Enhancement request - 5-day response

---

**Last Updated:** January 8, 2026  
**Version:** 1.0  
**Owner:** [Your Company/Name]
