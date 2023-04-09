const User = require('../models/User')
const jwt = require('jsonwebtoken')

const signUpValidator = require('../validator/user/signUpValidator')
const loginValidator = require('../validator/user/loginValidator')


const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const signup = async (req, res) => {

    try {
        const { name, email, password, repeat_password } = req.body

        await signUpValidator.validateAsync({ name, email, password, repeat_password })

        const isExist = await User.findOne({ email })

        if (!isExist) {

            const user = await User.create({ name, email, password })

            const token = createToken(user._id)

            return res.status(200)
                .json({ name, email, token })
        }
        res.status(400)
            .json({ error: 'Email already exists' })

    } catch (err) {
        res.status(400)
            .json({ error: err.message })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        await loginValidator.validateAsync({ email, password })

        const user = await User.login(email, password)

        if (user) {

            const token = createToken(user._id)

            res.status(200)
                .json({ name: user.name, email, token })
        }

    } catch (err) {
        res.status(400)
            .json({ error: err.message })
    }
}

module.exports = { signup, login }