const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string()
        .max(30)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2
        }),
    password: Joi.string()
        .min(6)
        .max(15)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .options({
            messages: { 'any.only': 'password confirmation does not match' }
        })
})


module.exports = schema
