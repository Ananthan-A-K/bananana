# Campus Complaint Management System (CCMS)

A full-stack MERN application for managing campus complaints with role-based dashboards for students and administrators.

---

# 🚀 Current Status: Hybrid Development Mode

The project is currently in a **Hybrid Development Phase**:

* **Frontend:** Fully functional using a Mock API with LocalStorage persistence.
* **Backend:** Authentication (Login/Register) implemented using JWT and MongoDB.
* **Complaint Management APIs:** Backend controllers are scaffolded and ready for implementation.
* **Default Configuration:** The frontend currently uses the Mock API to allow development without requiring MongoDB access.

---

# Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM v6
* Tailwind CSS v4

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT Authentication
* Role-based Access Control (Student/Admin)
* LocalStorage Session Persistence

### Development Tools

* ESLint
* Nodemon
* Concurrently

---

# Project Structure

```text
bananana/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── complaintRoutes.js
│   └── server.js
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── admin/
│   │   └── complaints/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── useAuth.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentComplaints.jsx
│   │   ├── SubmitComplaint.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminComplaints.jsx
│   │   ├── AdminAnalytics.jsx
│   │   ├── AdminUsers.jsx
│   │   └── Settings.jsx
│   │
│   ├── layouts/
│   ├── routes/
│   ├── services/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── README.md
```

---

# Features Implemented

## Student Features

### Student Dashboard

* View complaint statistics
* Total Complaints
* Pending Complaints
* Resolved Complaints
* Recent Complaints Overview

### My Complaints

* View submitted complaints
* Filter complaints
* Search complaints
* Track complaint status

### Submit Complaint

* Create new complaints
* Category selection
* Priority selection
* Form validation

---

## Admin Features

### Admin Dashboard

* Total Complaints
* Pending Complaints
* In Progress Complaints
* Resolved Complaints
* Quick Action Cards

### Complaint Management

* View all complaints
* Search complaints
* Filter by category
* Filter by status
* Sort complaints
* Update complaint status

### Analytics

* Status Distribution
* Category Distribution
* Priority Breakdown
* Monthly Complaint Trends

### User Management

* View users
* Role badges
* Status indicators
* User administration

---

## Shared Features

### Authentication

* Login
* Registration
* JWT Authentication
* Session Persistence
* Protected Routes

### Settings

* Profile Settings
* Notification Preferences
* Display Preferences

### Responsive UI

* Mobile Friendly
* Sidebar Navigation
* Role-Based Navigation
* Modern Dashboard Layout

---

# Recent Progress (June 2026)

### Admin Suite Implementation

Implemented:

* AdminComplaints Page
* AdminTable Component
* FilterBar Component
* SearchBox Component
* StatusDropdown Component

### Backend Foundation

Implemented:

* JWT Authentication
* MongoDB Integration
* User Model
* Complaint Model
* Authentication Routes

### UI Standardization

Completed:

* Shared UI Components
* Consistent Forms
* Dashboard Layout System

---

# Getting Started

## Prerequisites

* Node.js 18+
* MongoDB (Local or Atlas)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Ananthan-A-K/bananana.git
cd bananana
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.example .env
```

Configure:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
PORT=5000
```

---

# Running the Application

| Mode             | Command        | Description           |
| ---------------- | -------------- | --------------------- |
| Frontend Only    | npm run client | Uses Mock API         |
| Backend Only     | npm run server | Starts Express Server |
| Full Stack       | npm run dev    | Runs Client + Server  |
| Production Build | npm run build  | Creates build         |

---

# Demo Credentials

## Student

```text
Email: student@campus.edu
Password: password123
```

## Admin

```text
Email: admin@campus.edu
Password: password123
```

You may also register a new account through the Register page.

---

# Authentication Flow

1. User Registers or Logs In
2. Backend Generates JWT
3. JWT Stored in LocalStorage
4. AuthContext Restores Session
5. Protected Routes Validate Access
6. Role-Based Navigation Rendered

Stored Keys:

```text
ccms_token
ccms_user
```

---

# Role-Based Navigation

### Student

* Dashboard
* My Complaints
* Submit Complaint
* Settings

### Admin

* Dashboard
* All Complaints
* Analytics
* Users
* Settings

---

# Switching To Real Backend

To move from Mock API to Real API:

### Step 1

Whitelist your IP in MongoDB Atlas.

### Step 2

Update service configuration:

```javascript
import realApi from "./api.real";

const api = realApi;

export default api;
```

### Step 3

Implement complaint controller endpoints.

Required APIs:

```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/complaints
POST   /api/complaints
PATCH  /api/complaints/:id

GET    /api/admin/stats
GET    /api/admin/users
```

---

# Environment Variables

| Variable     | Description               |
| ------------ | ------------------------- |
| MONGODB_URI  | MongoDB Connection String |
| JWT_SECRET   | JWT Signing Secret        |
| PORT         | Backend Port              |
| CLIENT_URL   | Frontend URL              |
| VITE_API_URL | API Base URL              |

---

# Scripts

| Command         | Description       |
| --------------- | ----------------- |
| npm run client  | Start Frontend    |
| npm run server  | Start Backend     |
| npm run dev     | Start Full Stack  |
| npm run build   | Production Build  |
| npm run preview | Preview Build     |
| npm run lint    | Run ESLint        |
| npm start       | Production Server |

---

# Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make changes
4. Verify build passes

```bash
npm run build
```

5. Commit changes

```bash
git commit -m "feat: add new feature"
```

6. Push branch

```bash
git push origin feature/your-feature
```

7. Create Pull Request

---

# Roadmap

## Phase 1

* Complete Complaint CRUD APIs

## Phase 2

* Connect Frontend to Real Backend

## Phase 3

* Complaint Status Updates

## Phase 4

* File Attachments
* Email Notifications
* Advanced Analytics
* Dashboard Charts

---

# Known Issues

* MongoDB Atlas IP whitelist restrictions
* Complaint APIs pending implementation
* No attachment uploads yet
* No email notification system

---

# License

MIT License

