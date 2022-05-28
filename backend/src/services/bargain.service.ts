import { StatusCodes } from 'http-status-codes';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type {
    BargainStatus
} from '../database/entities/bargain-request.entity';

import type {
    CreateBargainDTO
} from '../validations/bargain-request.validation';

class BargainService {

    async create(
        userId: number, productId: number,
        bargain: CreateBargainDTO) {

        const user = await User.findOneByOrFail({ id: userId });
        const product = await Product.findOneByOrFail({ id: productId });

        const bargainReq = BargainRequest.create({
            user,
            product,
            ...bargain
        });

        await bargainReq.save();
    }

    async getAll(userId: number, productId: number) {
        return BargainRequest.find({
            where: {
                product: {
                    id: productId,
                    user: { id: userId }
                }
            },
            relations: {
                user: true,
                product: true
            }
        });
    }

    async update(
        userId: number,
        productId: number,
        bargainId: number,
        status: BargainStatus) {

        const product = await Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        if (product.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        const bargain = await BargainRequest.findOneByOrFail({ id: bargainId });
        bargain.status = status;

        await bargain.save();
    }

    async allOwned(userId: number) {
        const bargains = await BargainRequest.find({
            where: {
                user: { id: userId }
            },
            relations: {
                user: true,
                product: true
            }
        });

        return bargains;
    }

}

export const bargainService = new BargainService();