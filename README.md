# Student Admission Management System

Starter full-stack project using HTML5, CSS3, Bootstrap 5, Vanilla JavaScript, Node.js, Express.js and MongoDB Atlas.

## Requirements
- Node.js 18+
- MongoDB Atlas account
- VS Code (recommended)
- VS Code Live Server extension (for frontend)

## Setup

### 1. Configure backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` and update `MONGODB_URI` and `JWT_SECRET`.

### 2. Start backend
```bash
npm run dev
```
API runs at `http://localhost:5000`.

### 3. Start frontend
Open `frontend/index.html` with VS Code Live Server. The default frontend URL is `http://127.0.0.1:5500`.

If Live Server uses another port, update `FRONTEND_URL` in `backend/.env` and restart the backend.

### Deploy to Vercel
Deploy the repository root. Set `MONGODB_URI` and `JWT_SECRET` as Vercel environment variables. The root `vercel.json` serves the frontend and routes `/api/*` requests to the backend function.

## API endpoints
- `GET /` - API health check
- `POST /api/auth/register` - create student account
- `POST /api/auth/login` - student login

## Notes
- Public registration always creates a `student` role.
- Do not expose `.env`, database credentials, or JWT secrets.
- This is a starter foundation, not the complete production admission portal. Admission applications, document uploads, admin management, password reset, email verification, and deployment still need to be implemented.
