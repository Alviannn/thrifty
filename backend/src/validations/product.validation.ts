import joi from 'joi';

export interface ProductType {
    name: string;
    decription: string;
    price: number;
    type: number;
}

export interface ProductIdType {
    id: number;
}

export const productIdSchema = joi.object<ProductIdType>({
    id: joi.number()
        .min(0)
        .required()
});