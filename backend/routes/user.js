const express = require('express')
const { getUsers, getUser, loginUser, signupUser, deleteUser, updateUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// get all users (admin route - keeping as is for now, although usually protected)
router.get('/admin', getUsers)

// get the single user
router.get('/:id', getUser)

// user Login
router.post('/login', loginUser)

// user Signup
router.post('/signup', signupUser)

// require auth for profile routes
router.use('/profile', requireAuth)

// delete the user
router.delete('/profile', deleteUser)

// update the user
router.patch('/profile', updateUser)

module.exports = router