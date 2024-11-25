// library imports
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled.')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid Email.')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password.')
    }
    const userExists = await this.findOne({ email })
    if (userExists) {
        throw new Error('Email already registered.')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = await this.create({ email, password: hash })
    return newUser
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled.')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw new Error("Invaid email.")
    }
    const doPasswordsMatch = await bcrypt.compare(password, user.password)
    if (!doPasswordsMatch) {
        throw new Error("Invalid Password.")
    }
    return user
}

module.exports = mongoose.model('Users', userSchema) 