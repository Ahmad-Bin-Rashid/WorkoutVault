# WorkoutVault - Backend API

This is the Express REST API for the WorkoutVault application. It handles user authentication, database interactions via Mongoose, and serves as the data layer for the frontend.

## Technologies Used

- **Node.js** & **Express**: Web framework for building the API.
- **MongoDB** & **Mongoose**: NoSQL database and Object Data Modeling (ODM) library.
- **bcrypt**: Used for securely hashing user passwords before storing them in the database.
- **jsonwebtoken (JWT)**: Used for generating secure authentication tokens.
- **cors**: Middleware to allow cross-origin requests from the frontend.

## API Endpoints

### Authentication (`/api/user`)
- `POST /api/user/signup`: Register a new user account.
- `POST /api/user/login`: Authenticate an existing user and receive a JWT.

### Workouts (`/api/workouts`)
*Note: All workout routes require a valid JWT in the `Authorization: Bearer <token>` header.*
- `GET /api/workouts`: Retrieve all workouts belonging to the authenticated user.
- `POST /api/workouts`: Create a new workout log (requires `title`, `load`, and `reps`).
- `DELETE /api/workouts/:id`: Delete a specific workout by its ID.

## Environment Variables

Create a `.env` file in this directory with the following variables:
- `PORT`: (Optional) The port the server will listen on locally (e.g., 4000).
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secure random string used to sign JWTs.

## Scripts

- `npm start`: Starts the production server using Node.
- `npm run dev`: Starts the development server using nodemon for automatic restarts.
