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

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only if not in Vercel production
    if (process.env.NODE_ENV !== 'production') {
      app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
      })
    } else {
      console.log('connected to db')
    }
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = app
