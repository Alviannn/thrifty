import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';
import { IsNull } from 'typeorm';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type { ProductType } from '../validations/product.validation';

class ProductService {

    async add(userId: number, rawProduct: ProductType) {
        const user = (await User.findOneBy({ id: userId }))!;
        const product = Product.create({ ...rawProduct, user });

        await product.save();
    }

    async getAll() {
        const products = await Product.find({
            where: {
                deletedAt: IsNull()
            },
            relations: {
                user: true
            }
        });
        return products;
    }

    async getById(productId: number) {
        const product = await Product.findOne({
            where: {
                id: productId,
                deletedAt: IsNull()
            },
            relations: {
                user: true
            }
        });

        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        return product;
    }

    async getByUsers(userId: number) {
        const user = await User.findOneBy({ id: userId });

        if (!user) {
            throw new ResponseError(
                'User not found',
                StatusCodes.NOT_FOUND);
        }

        const products = await Product.findOne({
            where: {
                userId,
                deletedAt: IsNull()
            },
            relations: {
                user: true
            }
        });

        return products;
    }

    async update(userId: number, productId: number, dto: ProductType) {
        const { name, price, description, type } = dto;
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