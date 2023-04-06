const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    category: Joi.string()
        .required(),
    description: Joi.string(),
    price: Joi.number()
        .positive()
        .max(9999)
        .precision(2)
        .required().options({
            messages: {
                'number.base': 'price must be an integer and in two decimal places only'
            }
        }),
    image: Joi.string()
        .required(),
})


module.exports = schema
