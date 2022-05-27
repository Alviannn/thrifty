import joi from 'joi';

export interface TopupType {
    balance: number;
}

export const topupSchema = joi.object<TopupType>({
    balance: joi.number()
        .min(1_000)
        .required()
});