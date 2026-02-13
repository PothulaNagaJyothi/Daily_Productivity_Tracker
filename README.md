# Daily Productivity Tracker

A full-stack web application designed to help users track their daily activities, enforce a 24-hour time constraint (1440 minutes), and visualize productivity analytics.

![Productivity Tracker Overview](https://placehold.co/600x400?text=Productivity+Tracker+Preview)

## 🚀 Features

- **Daily Activity Logging**: Log activities like Work, Study, Exercise, etc.
- **Time Constraint Enforcement**: Ensures total daily activities do not exceed 1440 minutes.
- **Analytics Dashboard**: Visualize time distribution and productivity scores.
- **Secure Authentication**: User management powered by Supabase Auth.
- **Dark Mode Support**: Fully responsive dark theme for better user experience.
- **Responsive Design**: Modern UI built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Backend ([Read More](./backend/README.md))
- **Node.js & Express**: RESTful API server.
- **Supabase**: PostgreSQL database and Authentication.
- **Security**: Helmet, Rate Limiting, CORS.

### Frontend ([Read More](./frontend/README.md))
- **React (Vite)**: Fast, modern frontend framework.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Supabase Client**: For direct authentication and realtime features.
- **Chart.js**: For analytics visualization.

## 📂 Project Structure

```
daily_productivity_tracker/
├── backend/           # Node.js/Express API Server
│   ├── src/
│   ├── server.js
│   └── README.md
│
└── frontend/          # React + Vite Client Application
    ├── src/
    ├── vite.config.js
    └── README.md
```

## 🏁 Getting Started

To get the entire application running locally, you need to start both the backend and frontend servers.

### 1. Setup Backend

Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install
# Configure .env file (see backend/README.md)
node server.js
```

The backend server will run on `http://localhost:5000`.

### 2. Setup Frontend

Open a new terminal, navigate to the frontend directory, install dependencies, and start the vite server.

```bash
cd frontend
npm install
# Configure .env file (see frontend/README.md)
npm run dev
```

The frontend will run on `http://localhost:5173`.

## 📄 License

This project is licensed under the ISC License.
