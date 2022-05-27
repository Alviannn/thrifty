import joi from 'joi';

export interface ProductType {
    name: string;
    decription: string;
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