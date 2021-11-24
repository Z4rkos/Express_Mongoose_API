const joi = require("@hapi/joi");

// Registration Validation.
const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .min(3)
            .max(20)
            .alphanum()
            .required(),
        password: joi.string()
            .min(6)
            .max(20)
            .required(),
        email: joi.string()
            .min(6)
            .max(100)
            .required()
            .email()
    });
    return schema.validate(data);
}


// Login Validation.
const loginValidation = (data) => {
    const schema = joi.object({
        email:
            joi.string()
            .min(6)
            .max(100)
            .email(),
        password: joi.string()
            .min(6)
            .max(20)
            .required(),
    });
    return schema.validate(data);
}




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
