# Campus Complaint Management System (CCMS)

A full-stack MERN application for managing campus complaints with role-based dashboards for students and administrators.

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Tailwind CSS v4
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT with localStorage, role-based access (student/admin)
- **Dev Tools**: ESLint, Nodemon, Concurrently

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Icons.jsx        # SVG icon components
│   ├── Input.jsx        # Form input wrapper
│   ├── Navbar.jsx       # Top navigation bar
│   ├── ProtectedRoute.jsx # Route guard for auth/roles
│   ├── Sidebar.jsx      # Collapsible side navigation
│   └── StatCard.jsx     # Reusable metric card
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Auth state + localStorage persistence
│   ├── auth-context.js  # Context definition
│   └── useAuth.js       # Custom hook for auth
├── data/
│   └── dummyData.js     # Mock complaints + stats helpers
├── layouts/
│   └── MainLayout.jsx   # App shell with sidebar + navbar
├── pages/               # Route components
│   ├── AdminAnalytics.jsx    # Charts: category/priority/status trends
│   ├── AdminComplaints.jsx   # Admin complaint management table
│   ├── AdminDashboard.jsx    # Admin overview (4 stat cards + actions)
│   ├── AdminUsers.jsx        # User management table
│   ├── Home.jsx              # Landing page
│   ├── Login.jsx             # Login form
│   ├── Register.jsx          # Registration with role selection
│   ├── Settings.jsx          # Profile/Notifications/Preferences tabs
│   ├── StudentComplaints.jsx # Student complaint list table
│   ├── StudentDashboard.jsx  # Student overview (3 stat cards)
│   └── SubmitComplaint.jsx   # Complaint submission form
├── routes/
│   └── AppRoutes.jsx     # Route definitions with protection
├── services/
│   └── api.js           # Mock API (localStorage) - replace with real API
├── styles.css           # Global styles + Tailwind imports
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas) - **optional for frontend development**

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your MongoDB URI (required for backend)
# MONGODB_URI=mongodb://localhost:27017/ccms
# JWT_SECRET=your-secret-key
# VITE_API_URL=http://localhost:5000/api
```

### Running the Application

**Frontend Only (No Backend Required - Uses Mock API)**
```bash
npm run client
# Runs on http://localhost:5173 (or next available port)
```

**Full Stack (Requires MongoDB)**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client

# Or both together (will fail if MongoDB unavailable)
npm run dev
```

**Build for Production**
```bash
npm run build
# Output in dist/
```

## Demo Credentials (Mock API)

The mock API (`src/services/api.js`) includes pre-seeded accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student@campus.edu | password123 |
| Admin | admin@campus.edu | password123 |

You can also register new accounts via `/register`.

## Features Implemented

### Student Dashboard
- **Stat Cards**: Total Complaints, Pending, Resolved
- **Recent Complaints List** with status badges
- **My Complaints** page: Full table with filtering
- **Submit Complaint** form with validation

### Admin Dashboard
- **Stat Cards**: Total, Pending, In Progress, Resolved
- **Quick Actions**: Manage Complaints, Analytics, Users, Settings
- **All Complaints** table with inline status editing
- **Analytics**: Category bars, priority distribution, status cards, monthly trend
- **User Management**: Table with role/status badges

### Shared
- **Settings**: Profile, Notification preferences, Display preferences
- **Responsive Sidebar** with role-based navigation
- **Mobile-friendly** with collapsible menu

## Switching to Real Backend

When MongoDB is configured, replace the mock API:

1. **Update `src/services/api.js`** to use axios with your backend:
   ```javascript
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
   });
   
   // Add interceptors for auth token
   export default api;
   ```

2. **Implement backend endpoints** (see `server/` for existing scaffold):
   - `POST /api/auth/register` - Create user, return JWT
   - `POST /api/auth/login` - Validate credentials, return JWT
   - `GET /api/auth/me` - Get current user from token
   - `GET /api/complaints` - List complaints (with filters)
   - `POST /api/complaints` - Create complaint
   - `PATCH /api/complaints/:id` - Update status/assignment
   - `GET /api/admin/stats` - Dashboard statistics
   - `GET /api/admin/users` - User management

3. **Remove mock data** from `src/data/dummyData.js` once real API is connected.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Backend only |
| `JWT_SECRET` | Secret for signing JWT tokens | Backend only |
| `PORT` | Server port (default: 5000) | Backend only |
| `VITE_API_URL` | Backend API base URL | Frontend |

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run client` | Start Vite dev server (frontend only) |
| `npm run server` | Start Express with Nodemon |
| `npm run dev` | Run both client + server concurrently |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## Key Implementation Details

### Authentication Flow
- JWT stored in localStorage (`ccms_token`, `ccms_user`)
- `AuthProvider` wraps app, restores session on load
- `ProtectedRoute` guards routes by role (`student`/`admin`)
- `useAuth()` hook provides `user`, `login()`, `logout()`, `isAuthenticated`

### Role-Based Navigation
- `Sidebar.jsx` filters nav items by `user.role`
- Student sees: Dashboard, My Complaints, Submit Complaint
- Admin sees: Dashboard, All Complaints, Analytics, Users
- Both see: Settings

### Dummy Data Structure
```javascript
// Complaint object
{
  id: 'CMP-001',
  title: 'WiFi not working in Library',
  description: '...',
  category: 'IT Infrastructure',
  status: 'pending' | 'in_progress' | 'resolved',
  priority: 'low' | 'medium' | 'high',
  submittedAt: '2025-10-15T10:30:00Z',
  resolvedAt: '2025-10-18T14:20:00Z' | null,
  assignedTo: 'IT Support Team' | null
}
```

### Styling
- Tailwind CSS v4 with custom theme
- Color scheme: Slate (neutral), Blue (primary), Green/Yellow/Red (status)
- Responsive breakpoints: `sm:`, `lg:`
- Dark mode ready (add `dark:` classes)

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes, ensure `npm run build` passes
3. Run `npm run lint` to check code style
4. Commit with conventional messages: `feat:`, `fix:`, `chore:`
5. Push and open PR

## Known Issues / TODO

- [ ] Backend MongoDB connection needs IP whitelist or local MongoDB
- [ ] Replace mock API with real backend endpoints
- [ ] Add complaint detail view modal/page
- [ ] Add file upload for complaint attachments
- [ ] Implement email notifications
- [ ] Add pagination for large complaint lists
- [ ] Unit tests for components
- [ ] E2E tests with Playwright/Cypress

## License

MIT