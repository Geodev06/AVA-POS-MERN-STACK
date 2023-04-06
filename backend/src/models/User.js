const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        tolowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        tolowercase: true
    }
    , password: {
        type: String,
        required: true,
        minlength: 6
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email: email })

    if (user) {

        const authenticated = await bcrypt.compare(password, user.password)

        if (authenticated) {

            return user
        }

        throw Error('Incorrect credentials')

    }
    throw Error('Incorrect credentials')

}

const User = mongoose.model('user', userSchema)

module.exports = User