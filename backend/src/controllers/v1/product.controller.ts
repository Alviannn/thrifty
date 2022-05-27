import validate from '../../middlewares/validate.middleware';
import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productService } from '../../services/product.service';
import { sendResponse } from '../../utils/api.util';
import {
    productIdSchema,
    productAddSchema,
    productUpdateSchema
} from '../../validations/product.validation';

import {
    Controller, ReqHandler
} from '../../internals/decorators/express.decorator';
import type {
    ProductDTO,
    ProductIdType
} from '../../validations/product.validation';

@Controller({ path: 'products' })
export class ProductRoute {

    @ReqHandler('POST', '/', authenticate(), validate(productAddSchema))
    async add(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const body = req.body as ProductDTO;
        await productService.add(userId, body);

        return sendResponse(res, {
            message: 'Successfully added a new product',
            statusCode: StatusCodes.CREATED
        });
    }

    @ReqHandler('GET', '/')
    async getAll(req: Request, res: Response) {
        const products = await productService.getAll();

        return sendResponse(res, {
            message: 'Successfully found all products',
            statusCode: StatusCodes.OK,
            data: {
                products
            }
        });
    }

    @ReqHandler('GET', '/:productId', validate(productIdSchema, 'PARAMS'))
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

    @ReqHandler(
        'PUT', '/:productId',
        authenticate(),
        validate(productIdSchema, 'PARAMS'),
        validate(productUpdateSchema)
    )
    async update(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as ProductDTO;

        await productService.update(userId, productId, body);

        return sendResponse(res, {
            message: 'Successfully updated a product'
        });
    }

    @ReqHandler(
        'DELETE', '/:productId',
        authenticate(),
        validate(productIdSchema, 'PARAMS')
    )
    async delete(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;

        await productService.delete(userId, productId);

        return sendResponse(res, {
            message: 'Successfully deleted a product'
        });
    }

}
