# WorkoutVault

WorkoutVault is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users track their workout routines. Users can create an account, log in, and securely manage their personal workout data by logging exercises, including the number of repetitions and the load/weight used.

## Architecture

This project is structured as a monorepo containing both the frontend and backend services:

- **`/frontend`**: A React application built with Vite. It handles the user interface, authentication state, and communicates with the backend API.
- **`/backend`**: A Node.js and Express API connected to a MongoDB database. It provides secure RESTful endpoints using JWT (JSON Web Tokens) for authentication.

## Features

- **User Authentication**: Secure sign up and login using JWT and bcrypt password hashing.
- **Workout Management**: Authenticated users can create, view, and delete their own workout logs.
- **Protected Routes**: API endpoints and frontend routes are protected to ensure users can only access their own data.
- **Monorepo Deployment**: Configured for seamless deployment on Vercel using multi-service routing (`vercel.json`).

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js installed
- MongoDB instance (e.g., MongoDB Atlas or local)

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and configure your environment:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_random_secret>
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

The frontend will start (usually on `http://localhost:5173`) and is configured to proxy API requests to the backend (`http://localhost:4000`) via `vite.config.js`.

## Deployment

This project is configured to be deployed as a single project on [Vercel](https://vercel.com).
The root `vercel.json` file handles routing, directing `/api/*` traffic to the Express backend and all other traffic to the Vite frontend. 
Simply import this repository into Vercel, supply your `MONGO_URI` and `JWT_SECRET` as environment variables, and deploy!
