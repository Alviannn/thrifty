import { StatusCodes } from 'http-status-codes';
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
        const product = Product.findOneBy({ id: productId });
        if (!product) {
            throw new ResponseError(
                'Product not found',
                StatusCodes.NOT_FOUND);
        }

        return product;
    }

}

export const productService = new ProductService();