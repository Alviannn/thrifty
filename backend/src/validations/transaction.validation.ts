import joi from 'joi';

export interface CreateTransactionDTO {
    bargainId: number;
    payment: number;
}

export const transactionSchema = joi.object<CreateTransactionDTO>({
    bargainId: joi.number()
        .min(1)
        .required(),
    payment: joi.number()
        .min(1)
        .required()
});