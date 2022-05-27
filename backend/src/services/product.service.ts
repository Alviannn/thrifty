import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';
import { Errors, ResponseError } from '../utils/api.util';
import { IsNull } from 'typeorm';

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

    async getAll() {
        const products = await Product.findBy({ deletedAt: IsNull() });

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
        const product = await Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        return product;
    }

    async getByUserId(userId: number) {
        const user = await User.findOneBy({ id: userId });

        if (!user) {
            throw new ResponseError(
                'User not found',
                StatusCodes.NOT_FOUND);
        }

        const products = await Product.findBy({ userId });

        return products;
    }

    async update(userId: number, productId: number, rawProduct: ProductType) {
        const { name, price, description, type } = rawProduct;
        const product = await Product.findOneBy({ id: productId });

        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }
        if (product.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.type = type ?? product.type;
        product.updatedAt = DateTime.utc();

        await product.save();
    }

    async delete(userId: number, productId: number) {
        const product = await Product.findOneBy({ id: productId });

        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }
        if (product.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        product.deletedAt = DateTime.utc();
        await product.save();
    }

}

export const productService = new ProductService();