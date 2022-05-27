import joi from 'joi';
import type {
    BargainStatus
} from '../database/entities/bargain-request.entity';

export interface CreateBargainDTO {
    price: number;
    quantity: number;
}

export interface BargainIdDTO {
    bargainId: number;
}

export interface UpdateBargainDTO {
    status: BargainStatus;
}

export const bargainSchema = joi.object<CreateBargainDTO>({
    price: joi.number().required(),
    quantity: joi.number()
        .min(1)
        .required()
});

export const bargainIdSchema = joi.object<BargainIdDTO>({
    bargainId: joi.number()
        .min(1)
        .required()
});

export const updateBargainSchema = joi.object<UpdateBargainDTO>({
    status: joi.number()
        .min(0)
        .required()
});