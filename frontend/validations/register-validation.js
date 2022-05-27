import Joi from 'joi';

const registerSchema = Joi.object({
    fullName: Joi
        .string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Kolom nama lengkap wajib diisi',
            'string.max': 'Kolom nama lengkap tidak dapat mengandung lebih dari 50 karakter'
        }),
    address: Joi
        .string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Kolom alamat wajib diisi',
            'string.max': 'Kolom alamat tidak dapat mengandung lebih dari 50 karakter'
        }),
    phone: Joi
        .string()
        .required()
        .min(10)
        .max(15)
        .pattern(/^[0-9]+$/)
        .messages({
            'string.empty': 'Kolom nomor telepon wajib diisi',
            'string.min': 'Kolom nomor telepon harus mengandung setidaknya 10 angka',
            'string.max': 'Kolom nomor telepon tidak dapat mengandung lebih dari 15 angka',
            'string.pattern.base': 'Nomor telepon hanya dapat mengandung angka'
        }),
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
        .min(8)
        .max(50)
        .messages({
            'string.empty': 'Kolom password wajib diisi',
            'string.min': 'Kolom password harus mengandung setidaknya 8 karakter',
            'string.max': 'Kolom password tidak dapat mengandung lebih dari 50 karakter',
        }),
    confirmPassword: Joi
        .any()
        .valid(Joi.ref('password'))
        .messages({
            'any.only': 'Password tidak cocok'
        })
});

export default registerSchema;