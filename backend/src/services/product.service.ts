import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
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

}

export const productService = new ProductService();