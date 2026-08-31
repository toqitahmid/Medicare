# MediCare Connect – Hospital Appointment & Healthcare Management System

## Project Overview
**MediCare Connect** is a modern healthcare management platform designed to seamlessly connect patients, doctors, and hospital administrators through a centralized online ecosystem. Patients can effortlessly book appointments, track medical records, make secure payments via Stripe, and review healthcare providers. Doctors can efficiently manage their availability, handle patient consultations, and issue digital prescriptions. Administrators maintain full system oversight through verification workflows, user management, and advanced analytics.

---

## Roles & Core Functionalities

### 1. Patient
- **Authentication & Profile:** Registration, secure login, profile picture management, personal health profile setup.
- **Doctor Search & Booking:** Search doctors by name or specialization, apply filters/sorting, view detailed doctor profiles, and select available time slots.
- **Payment & History:** Secure online fee payment via Stripe integration, complete view of past and upcoming appointments, receipt generation.
- **Reviews & Feedback:** Submit, update, and manage doctor ratings and detailed reviews.

### 2. Doctor
- **Professional Profile Management:** Configure qualifications, specializations, hospital affiliations, consultation fees, and available days/slots.
- **Schedule Management:** Dynamic time-slot generation and schedule updates.
- **Appointment Processing:** Accept or reject booking requests, mark consultation status as complete, and access consultation history.
- **Digital Prescriptions:** Complete CRUD interface to issue, update, and manage patient prescriptions with diagnosis and dosage notes.

### 3. Admin
- **User & Doctor Management:** View, suspend, or manage users; review doctor registration requests with single-click verification or rejection.
- **System Oversight:** Monitor all appointments, oversee financial transactions, and review platform-wide activity logs.
- **Analytics & Reporting:** Interactive charts displaying doctor performance metrics, total platform revenue, user registration trends, and appointment statistics.

---

## Technical Architecture & Database Design

### Database Collections Schema (MongoDB)

#### Collection 1: Users
```json
{
  "_id": "ObjectId",
  "name": "Sarah Jenkins",
  "email": "sarah@example.com",
  "role": "patient", // "patient" | "doctor" | "admin"
  "photo": "https://example.com/photos/sarah.jpg",
  "phone": "+1234567890",
  "gender": "female",
  "createdAt": "2026-08-31T13:18:58Z",
  "status": "active" // "active" | "suspended"
}
```

#### Collection 2: Doctors
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId('...')",
  "doctorName": "Dr. Alex Mercer",
  "specialization": "Cardiology",
  "qualifications": ["MD", "FACC"],
  "experience": 12,
  "consultationFee": 150,
  "hospitalName": "Metropolitan General Hospital",
  "profileImage": "https://example.com/photos/alex.jpg",
  "availableDays": ["Monday", "Wednesday", "Friday"],
  "availableSlots": ["09:00 AM", "11:00 AM", "02:00 PM"],
  "verificationStatus": "verified" // "pending" | "verified" | "rejected"
}
```

#### Collection 3: Appointments
```json
{
  "_id": "ObjectId",
  "patientId": "ObjectId('...')",
  "doctorId": "ObjectId('...')",
  "appointmentDate": "2026-09-05",
  "appointmentTime": "10:00 AM",
  "appointmentStatus": "accepted", // "pending" | "accepted" | "rejected" | "completed"
  "symptoms": "Chest tightness and mild shortness of breath.",
  "paymentStatus": "paid" // "unpaid" | "paid"
}
```

#### Collection 4: Reviews
```json
{
  "_id": "ObjectId",
  "patientId": "ObjectId('...')",
  "doctorId": "ObjectId('...')",
  "rating": 5,
  "reviewText": "Extremely attentive and professional doctor. Short wait time!",
  "createdAt": "2026-08-31T13:18:58Z"
}
```

#### Collection 5: Payments
```json
{
  "_id": "ObjectId",
  "appointmentId": "ObjectId('...')",
  "patientId": "ObjectId('...')",
  "doctorId": "ObjectId('...')",
  "amount": 150,
  "transactionId": "txn_3Msy81Lkd893JsK",
  "paymentDate": "2026-08-31T13:18:58Z"
}
```

#### Collection 6: Prescriptions
```json
{
  "_id": "ObjectId",
  "doctorId": "ObjectId('...')",
  "patientId": "ObjectId('...')",
  "appointmentId": "ObjectId('...')",
  "diagnosis": "Mild Hypertension",
  "medications": [
    {
      "name": "Lisinopril",
      "dosage": "10mg",
      "frequency": "Once daily",
      "duration": "30 days"
    }
  ],
  "notes": "Reduce salt intake and monitor blood pressure daily.",
  "createdAt": "2026-08-31T13:18:58Z"
}
```

---

## Security & API Verification Setup

### Express Middleware for JWT & Role-Based Authorization
```javascript
const jwt = require('jsonwebtoken');

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized access: Missing or invalid token format' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden access: Token expired or invalid' });
    }
    req.decoded = decoded;
    next();
  });
};

// Dynamic Role Verification Middleware
const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.decoded?.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges for this action' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
```

---

## Features & Implementation Roadmap

| Feature / Module | Scope | Technical Details |
| :--- | :--- | :--- |
| **Authentication & Authorization** | Client & Server | Better Auth / Firebase Auth integration, JWT token issuance, password security validation rule (`/^(?=.*[0-9])(?=.*[!@#$%^&*])/`). |
| **Advanced Doctor Search & Filtering** | Client & Server | Server-side MongoDB queries (`$regex`, `$or`), multi-param filtering (Name, Specialization), multi-metric sorting (Fee, Experience, Rating), pagination. |
| **Stripe Payment Integration** | Full Stack | Stripe Checkout/PaymentIntents SDK integration, webhook verification, atomic transaction updates in Database. |
| **Dynamic Dashboards** | Client | Role-specific views (Patient, Doctor, Admin) with Recharts integration for analytics and statistics visualization. |
| **UX & Extras** | Client | Framer Motion page animations, Dark/Light theme switcher, custom responsive layouts (Table/Card view toggle), interactive notifications (Toast/SweetAlert2). |

---

## Submission Credentials & Links

```text
Admin Credentials:
Admin Email: admin@medicareconnect.com
Admin Password: AdminSecurePass#2026

Links:
Live Site Link: https://medicare-alpha-azure.vercel.app
GitHub Repository (Client): https://github.com/toqitahmid/Medicare
GitHub Repository (Server): https://github.com/toqitahmid/Medicare-Server
```
