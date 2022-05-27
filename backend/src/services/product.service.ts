import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';
import { ResponseError } from '../utils/api.util';

import type { ProductType } from '../validations/product.validation';
import type {
    CreateBargainDTO
} from '../validations/bargain-request.validation';

class ProductService {

    async add(userId: number, rawProduct: ProductType) {
        const user = (await User.findOneBy({ id: userId }))!;
        const product = Product.create({ ...rawProduct, user });

        await product.save();
    }

    async get() {
        const products = await Product.find();

        return products;
    }

    async bargain(
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

    async getById(productId: number) {
        console.log(productId);
        const product = await Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        return product;
    }

    async update(productId: number, rawProduct: ProductType) {
        const product = await Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        product.name = rawProduct.name ?? product.name;
        product.price = rawProduct.price ?? product.price;
        product.description = rawProduct.description ?? product.description;
        product.type = rawProduct.type ?? product.type;
        product.updatedAt = DateTime.utc();

        await product.save();
    }

}

export const productService = new ProductService();