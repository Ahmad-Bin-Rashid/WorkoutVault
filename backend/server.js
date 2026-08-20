require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// database connection middleware
let cachedPromise = null;
const connectDB = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI);
  }
  try {
    await cachedPromise;
    next();
  } catch (error) {
    cachedPromise = null;
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};

app.use(connectDB);

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// listen for requests only if not in Vercel production
if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })
}

module.exports = app
