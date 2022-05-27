import { StatusCodes } from 'http-status-codes';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type {
    CreateBargainDTO
} from '../validations/bargain-request.validation';

class BargainService {

    async requestBargain(
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

    async viewBargains(userId: number, productId: number) {
        const product = await Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        if (product.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        return BargainRequest.findBy({ productId });
    }

}

export const bargainService = new BargainService();