
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers


    if (!authorization) {
        return res.status(401)
            .json({ error: 'Authorization token required!' })
    }

    try {
        const token = authorization.split(' ')[1]
   
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findOne({ _id }).select('_id')

        next()

    } catch (err) {
        res.status(401)
            .json({ error: err.message })
    }

}

module.exports = requireAuth