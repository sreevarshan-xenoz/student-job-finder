# Student Job Tracker

A web application for students to track their job applications, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add job applications with details like company, role, status, date, and link
- View all applications in a responsive layout
- Filter applications by status or date
- Update application status
- Delete job applications

## Tech Stack

### Frontend
- React (with Hooks)
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js for RESTful API
- MongoDB for database
- Mongoose for object modeling

### Deployment
- Frontend: Vercel
- Backend: Render/Railway
- Database: MongoDB Atlas

## Project Structure

```
student-job-finder/
├── frontend/           # React frontend
└── backend/            # Node.js backend
```

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string and other environment variables
4. Start the server: `npm start`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Deployment

### Backend Deployment (Render/Railway)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)
1. Connect your GitHub repository
2. Configure build settings
3. Deploy