# Daily Productivity Tracker Backend

A robust RESTful API for tracking daily activities, enforcing productivity constraints (1440 minutes/day), and generating analytics insights. Built with **Node.js**, **Express**, and **Supabase**.

## Overview

The **Daily Productivity Tracker Backend** manages user activities and productivity analytics. It enforces a fundamental constraint: users have exactly **1440 minutes (24 hours) per day**. The system tracks activities by category, calculates daily statistics, and generates productivity scores.

Key features include:
- **Authentication**: Secure JWT verification via Supabase Auth.
- **Data Integrity**: Real-time validation of the 1440-minute daily limit.
- **Analytics**: Automated calculation of productivity scores and category breakdowns.
- **Security**: Implements Rate Limiting, Helmet (headers), and CORS.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit

---

## Project Structure

```
backend/
├── server.js                  # Application entry point (starts server)
├── package.json               # Dependencies
├── .env                       # Environment variables (not committed)
└── src/
    ├── app.js                 # Express app setup (middleware, routes)
    ├── config/
    │   └── supabaseClient.js  # Supabase client configuration
    ├── controllers/           # Request handlers
    │   ├── activity.controller.js
    │   └── analytics.controller.js
    ├── services/              # Business logic (1440-limit enforcement)
    │   ├── activity.service.js
    │   └── analytics.service.js
    ├── middlewares/           # Custom middlewares
    │   ├── auth.middleware.js       # JWT specific verification
    │   ├── error.middleware.js      # Centralized error handling
    │   ├── rateLimit.middleware.js  # API Rate limiting
    │   └── validation.middleware.js # Request validation wrapper
    ├── routes/                # API route definitions
    │   ├── activity.routes.js
    │   └── analytics.routes.js
    └── utils/                 # Utility functions
        └── date.utils.js
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase project

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `backend` folder with the following keys:

   ```env
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Required for Admin access
   FRONTEND_URL=http://localhost:5173              # For CORS configuration
   ```

   > **Important**: `SUPABASE_SERVICE_ROLE_KEY` is required for the backend to perform administrative operations (like `auth.getUser` validation). Do NOT convert this to the anon key.

4. **Start the Server:**
   ```bash
   node server.js
   ```

---

## API Documentation

### Authentication

All API endpoints are protected and require a valid Supabase JWT token.
- **Header**: `Authorization: Bearer <your-supabase-token>`
- **User ID**: The backend automatically extracts the `user_id` from the valid token. You do **not** need to send `user_id` in the request body.

### Activities

#### 1. Get Activities for a Date
Retrieves all activities and the daily summary for the authenticated user on a specific date.

- **Endpoint**: `GET /api/days/:date`
- **Example**: `GET /api/days/2025-02-13`

#### 2. Create Activity
Adds a new activity. The backend validates that the total duration for the day does not exceed 1440 minutes.

- **Endpoint**: `POST /api/activities`
- **Body**:
  ```json
  {
    "date": "2025-02-13",
    "title": "Morning Job",
    "category": "Work",
    "duration_minutes": 240
  }
  ```

#### 3. Update Activity
Updates an existing activity. Re-validates the 1440-minute limit based on the new duration.

- **Endpoint**: `PUT /api/activities/:id`
- **Body** (fields are optional):
  ```json
  {
    "title": "Morning Job - Extended",
    "duration_minutes": 260
  }
  ```

#### 4. Delete Activity
Removes an activity and updates the day's total minutes.

- **Endpoint**: `DELETE /api/activities/:id`

### Analytics

#### Get Daily Analytics
Retrieves calculated statistics and productivity score for a specific date.

- **Endpoint**: `GET /api/analytics/:date`
- **Example**: `GET /api/analytics/2025-02-13`
- **Response**:
  ```json
  {
    "success": true,
    "totalMinutes": 360,
    "categoryBreakdown": { "Work": 240, "Exercise": 120 },
    "productivityScore": 85
  }
  ```

---

## Error Handling

Errors are returned in a consistent JSON format:
```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## License

ISC
