const express = require('express')
const { getUsers, getUser, loginUser, signupUser, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router()

// get all users
router.get('/admin', getUsers)

// get the single user
router.get('/:id', getUser)

// user Login
router.post('/login', loginUser)

// user Signup
router.post('/signup', signupUser)

// delete the user
router.delete('/:id', deleteUser)

// update the user
router.patch('/:id', updateUser)

module.exports = router