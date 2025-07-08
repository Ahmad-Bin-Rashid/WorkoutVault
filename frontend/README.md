# WorkoutVault - Frontend

This is the React frontend for the WorkoutVault application, bootstrapped using [Vite](https://vitejs.dev/). It provides a responsive and dynamic user interface for managing workout routines.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Vite**: Next-generation frontend tooling for fast development and optimized production builds.
- **React Router**: For handling navigation between the Home, Login, and Signup pages.
- **Context API**: Used for global state management (Authentication state and Workouts state).
- **date-fns**: For formatting timestamps (e.g., "2 days ago").

## Project Structure

- `src/pages/`: Contains the main route views (`Home.jsx`, `Login.jsx`, `Signup.jsx`).
- `src/components/`: Reusable UI components like `WorkoutDetails.jsx` and `WorkoutForm.jsx`, as well as the `Navbar.jsx`.
- `src/context/`: Context providers for managing global state (`AuthContext.js`, `WorkoutContext.js`).
- `src/hooks/`: Custom React hooks (`useLogin`, `useSignup`, `useAuthContext`, `useWorkoutsContext`) to encapsulate logic and state updates.

## API Integration

The frontend communicates with the backend API via the standard `fetch` API. 
- In development, `vite.config.js` is set up with a proxy so that any requests to `/api` are automatically forwarded to `http://localhost:4000`.
- In production, it uses the `VITE_API_URL` environment variable (or falls back to a relative path, which is handled by Vercel's multi-service routing).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally preview the production build.
