import fsp from 'fs/promises';

import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';
import { IsNull } from 'typeorm';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type {
    ProductDTO,
    CreateProductDTO
} from '../validations/product.validation';

class ProductService {

    async create(userId: number, dto: CreateProductDTO) {
        const { imageData, ...rawProduct } = dto;

        const user = (await User.findOneByOrFail({ id: userId }))!;
        const product = Product.create({ ...rawProduct, user });

        const imageFile = `img/${nanoid()}`;
        product.imageFile = imageFile;

        await product.save();

        try {
            await fsp.mkdir('img');
        } catch (err) {
            // ignore
        }
        await fsp.writeFile(imageFile, imageData);
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

        const products = await Product.find({
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

    async update(userId: number, productId: number, dto: ProductDTO) {
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

        await product.remove();

        // product.deletedAt = DateTime.utc();
        // await product.save();
    }

}

export const productService = new ProductService();