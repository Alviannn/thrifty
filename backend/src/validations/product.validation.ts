import joi from 'joi';

export interface ProductDTO {
    name: string;
    price: number;
    description: string;
    type: number;
}

export interface ProductIdType {
    productId: number;
}

export const productIdSchema = joi.object<ProductIdType>({
    productId: joi.number()
        .min(1)
        .required()
});

export const productAddSchema = joi.object<ProductDTO>({
    name: joi.string()
        .max(64)
        .required(),

    description: joi.string()
        .max(1023)
        .required(),

    price: joi.number()
        .min(1)
        .required(),

    type: joi.number()
        .max(5)
        .required()
});

export const productUpdateSchema = joi.object<ProductDTO>({
    name: joi.string()
        .max(64),

    price: joi.number()
        .min(1),

    description: joi.string()
        .max(1023),

    type: joi.number()
        .max(5)
});
