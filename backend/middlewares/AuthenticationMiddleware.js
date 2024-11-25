// library imports
const jwt = require("jsonwebtoken")

// local imports
const UserModel = require("../models/UserModel")

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ error: 'Authentication token required.' })
        }
        const token = authorization.split(' ')[1]
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        const userId = await UserModel.findOne({ _id }).select('_id')
        req.user = userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Authentication failed.' })
    }
}

module.exports = authenticate

