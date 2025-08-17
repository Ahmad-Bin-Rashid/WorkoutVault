const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


// creating JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}


// get all users
const getUsers = async (req, res) => {

    const users = await User.find({}).sort({ createdAt: -1 })

    if (!users) {
        return res.status(404).json({ error: 'No users avaiable!' })
    }
    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    // validating the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID!' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'User unavailable!' })
    }

    res.status(200).json(user)
}


// login the user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const username = user.username

        //create a jwt token
        const token = createToken(user._id)

        res.status(200).json({ username, email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// create new user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup(username, email, password)

        //create a jwt token
        const token = createToken(user._id)

        res.status(200).json({ username, email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// delete the user
const deleteUser = async (req, res) => {
    const id = req.user._id

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'Unable to delete!' })
    }

    // Also delete all workouts associated with this user
    await Workout.deleteMany({ user_id: id })

    res.status(200).json(user)
}

// update the user
const updateUser = async (req, res) => {
    const id = req.user._id
    const { username, password } = req.body

    let updateData = {}

    if (username) {
        updateData.username = username
    }

    if (password) {
        const bcrypt = require('bcrypt')
        const validator = require('validator')

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password must be atleast 8 characters long. It should contain lowercase, uppercase, number and a special character.' })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        updateData.password = hash
    }

    const user = await User.findOneAndUpdate({ _id: id }, updateData, { new: true })

    if (!user) {
        return res.status(404).json({ error: 'Unable to update!' })
    }

    res.status(200).json({ username: user.username, email: user.email })
}


const sendEmail = require('../utils/emailService');

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a unique secret for this user using their current password hash
        const secret = process.env.JWT_SECRET + user.password;
        
        // Create token that expires in 15 minutes
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '15m' });

        // Frontend URL where the user will be redirected
        // Make sure FRONTEND_URL is set in .env or default to localhost
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const link = `${frontendUrl}/reset-password/${user._id}/${token}`;

        const success = await sendEmail({
            to: user.email,
            subject: 'WorkoutVault - Password Reset',
            text: `Click the link to reset your password: ${link}\nThis link is valid for 15 minutes.`
        });

        if (success) {
            res.status(200).json({ message: 'Password reset link sent to your email' });
        } else {
            res.status(500).json({ error: 'Failed to send email' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// reset password
const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify token using the same secret
        const secret = process.env.JWT_SECRET + user.password;
        
        try {
            jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const bcrypt = require('bcrypt');
        const validator = require('validator');

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password must be atleast 8 characters long. It should contain lowercase, uppercase, number and a special character.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;
        await user.save();

        res.status(200).json({ message: 'Password has been successfully updated' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUsers, getUser, loginUser, signupUser, deleteUser, updateUser, forgotPassword, resetPassword }