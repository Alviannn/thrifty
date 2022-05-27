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

    async update(userId: number, productId: number, rawProduct: ProductType) {
        const product = await Product.findOneBy({ id: productId });

        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }
        if (product.userId !== userId) {
            throw Errors.NO_PERMISSION;
        }

        product.name = rawProduct.name ?? product.name;
        product.price = rawProduct.price ?? product.price;
        product.description = rawProduct.description ?? product.description;
        product.type = rawProduct.type ?? product.type;
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