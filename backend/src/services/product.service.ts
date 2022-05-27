import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';
import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { ResponseError } from '../utils/api.util';
import type { ProductType } from '../validations/product.validation';

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
        product.description = rawProduct.decription ?? product.description;
        product.type = rawProduct.type ?? product.type;
        product.updatedAt = DateTime.utc();

        await product.save();
    }

}

export const productService = new ProductService();