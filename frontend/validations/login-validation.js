import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi
        .string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
            'string.empty': 'Kolom email wajib diisi',
            'string.email': 'Format email tidak sah'
        }),
    password: Joi
        .string()
        .required()
        .messages({
            'string.empty': 'Kolom password wajib diisi'
        })
});

export default loginSchema;