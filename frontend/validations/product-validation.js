import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Kolom nama produk wajib diisi',
            'string.max': 'Kolom nama produk tidak dapat mengandung lebih dari 50 karakter'
        }),
    price: Joi
        .string()
        .required()
        .max(9)
        .pattern(/^[0-9]+$/)
        .messages({
            'string.empty': 'Kolom harga produk wajib diisi',
            'string.max': 'Kolom harga produk tidak dapat mengandung lebih dari 9 angka',
            'string.pattern.base': 'Harga produk hanya dapat mengandung angka'
        }),
    description: Joi
        .string()
        .required()
        .max(255)
        .messages({
            'string.empty': 'Kolom deskripsi produk wajib diisi',
            'string.max': 'Kolom deskripsi produk tidak dapat mengandung lebih dari 255 karakter'
        }),
    type: Joi
        .string()
        .required()
        .max(1)
        .pattern(/^[1-4]+$/)
        .messages({
            'string.empty': 'Kolom tipe produk wajib diisi',
            'string.max': 'Kolom tipe produk tidak dapat mengandung lebih dari 1 angka',
            'string.pattern.base': 'Tipe produk hanya dapat mengandung angka dari 1 hingga 4'
        }),
});

export default productSchema;