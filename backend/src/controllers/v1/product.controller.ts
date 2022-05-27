import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    Controller, ReqHandler
} from '../../internals/decorators/express.decorator';
import authenticate from '../../middlewares/authenticate.middleware';
import validate from '../../middlewares/validate.middleware';
import { productService } from '../../services/product.service';
import { sendResponse } from '../../utils/api.util';
import type {
    ProductIdType, ProductType
} from '../../validations/product.validation';
import {
    addSchema, updateSchema
} from '../../validations/product.validation';

@Controller({ path: 'product' })
export class ProductRoute {

    @ReqHandler('POST', '/', authenticate(), validate(addSchema))
    async add(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const body = req.body as ProductType;
        await productService.add(userId, body);

        return sendResponse(res, {
            message: 'Successfully added a new product',
            statusCode: StatusCodes.CREATED
        });
    }

    @ReqHandler('GET', '/')
    async get(req: Request, res: Response) {
        const products = await productService.get();

        return sendResponse(res, {
            message: 'Successfully found all products',
            statusCode: StatusCodes.OK,
            data: {
                products
            }
        });
    }

    @ReqHandler('GET', '/:productId')
    async getById(req: Request, res: Response) {
        const { productId } = req.params as unknown as ProductIdType;

        const product = await productService.getById(productId);

        return sendResponse(res, {
            message: 'Successfully found a product',
            data: {
                product
            }
        });
    }

    @ReqHandler('PUT', '/:productId', validate(updateSchema))
    async update(req: Request, res: Response) {
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as ProductType;

        await productService.update(productId, body);

        return sendResponse(res, {
            message: 'Successfully updated a product'
        });
    }

    @ReqHandler('DELETE', '/:productId', authenticate())
    async delete(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;

        await productService.delete(userId, productId);

        return sendResponse(res, {
            message: 'Successfully deleted a product'
        });
    }

}