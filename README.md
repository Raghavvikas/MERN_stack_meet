# PETMEET

# React-Redux CRUD Application with Authentication

## Introduction
This project is a full-stack CRUD (Create, Read, Update, Delete) application built using React.js for the frontend, Node.js with Express.js for the backend, and MongoDB for the database. It includes functionality for user registration, login, forgot password, change password, profile update, and profile delete. Authentication is implemented using JWT tokens and bcrypt for password hashing. React-Redux Toolkit is utilized for global state management, and Material-UI is used for form and webpage designs.

## Prerequisites
Ensure you have the following installed on your system:
- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project


# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri

# Start MongoDB service
mongod

# Navigate to the backend directory
cd ../backend

# Start the server
npm start

# Navigate to the frontend directory
cd ../frontend

# Start the development server
npm start

Access the application:
Frontend: Open your browser and visit http://localhost:3000



Project Structure
backend/: Contains the Node.js server files.
config/: Configuration files (e.g., database connection, JWT secret).
controllers/: Controllers for handling API routes.
middlewares/: Middleware functions (e.g., authentication).
models/: MongoDB data models.
routes/: Express.js routes.
utils/: Utility functions (e.g., password hashing).
index.js: Entry point for the backend server.
frontend/: Contains the React.js frontend files.
public/: Static assets and HTML template.
src/: React components, Redux setup, and application logic.
components/: Reusable React components.
pages/: Main pages of the application.
redux/: Redux store configuration, actions, reducers.
services/: API service functions.
utils/: Utility functions.
App.js: Main component.
index.js: Entry point for the React application.







Technologies Used
React.js
Node.js
Express.js
MongoDB
React-Redux Toolkit
JWT for authentication
bcrypt for password hashing
Material-UI for UI components
