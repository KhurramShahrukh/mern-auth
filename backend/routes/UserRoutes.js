// library imports
const express = require('express')

// local imports
const { userLogin, userSignup } = require('../controllers/UserController')

const router = express.Router()

// ligin route
router.post('/login', userLogin)

// signup route
router.post('/signup', userSignup)

module.exports = router