// library imports
const jwt = require('jsonwebtoken')

// local imports
const UserModel = require('../models/UserModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const loggedInUser = await UserModel.login(email, password)
        const token = createToken(loggedInUser._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const userSignup = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUserResponse = await UserModel.signup(email, password)
        const token = createToken(newUserResponse._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    userLogin,
    userSignup
}