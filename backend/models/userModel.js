
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// creating the schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


// static signup method
userSchema.statics.signup = async function (username, email, password) {

    // validation
    if (!username || !email || !password) {
        throw Error('All fields must be filled!!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email!!')
    }

    if (!validator.isAlphanumeric(username)) {
        throw Error('Username should contain alphabets or numbers!!')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be atleast 8 characters long. It should contain lowercase, uppercase, number and a special character.')
    }

    const checkEmail = await this.findOne({ email })

    if (checkEmail) {
        throw Error('Email already exists!!')
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //creating the user
    const user = await this.create({ username, email, password: hash })

    return user
}


// static login method
userSchema.statics.login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled!!')
    }

    // finding the user
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email or Password!!')
    }

    // checking the password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect Email or Password!!')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)