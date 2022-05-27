import { Product } from '../database/entities/product.entity';
import { User } from '../database/entities/user.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';

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

}

export const productService = new ProductService();