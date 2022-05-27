import joi from 'joi';

export interface CreateBargainDTO {
    price: number;
    quantity: number;
}

export const bargainSchema = joi.object<CreateBargainDTO>({
    price: joi.number().required(),
    quantity: joi.number()
        .min(1)
        .required()
});