import joi from 'joi';

export interface ProductType {
    name: string;
    description: string;
    price: number;
    type: number;
}

export interface ProductIdType {
    productId: number;
}

export const productIdSchema = joi.object<ProductIdType>({
    productId: joi.number()
        .min(0)
        .required()
});

export const addSchema = joi.object<ProductType>({
    name: joi.string()
        .max(64)
        .required(),

    description: joi.string()
        .max(1023)
        .required(),

    price: joi.number()
        .max(19)
        .required(),

    type: joi.number()
        .max(5)
        .required()
});

export const updateSchema = joi.object<ProductType>({
    name: joi.string()
        .max(64),

    description: joi.string()
        .max(1023),

    price: joi.number()
        .max(19),

    type: joi.number()
        .max(5)
});
