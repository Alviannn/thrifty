import validate from '../../middlewares/validate.middleware';
import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productService } from '../../services/product.service';
import { sendResponse } from '../../utils/api.util';
import { bargainSchema } from '../../validations/bargain-request.validation';
import {
    productIdSchema,
    addSchema,
    updateSchema
} from '../../validations/product.validation';

import {
    Controller, ReqHandler
} from '../../internals/decorators/express.decorator';
import type {
    CreateBargainDTO
} from '../../validations/bargain-request.validation';
import type {
    ProductType,
    ProductIdType
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
        const products = await productService.getAll();

        return sendResponse(res, {
            message: 'Successfully found all products',
            statusCode: StatusCodes.OK,
            data: {
                products
            }
        });
    }

    @ReqHandler(
        'POST', '/:productId/bargain',
        authenticate(),
        validate(productIdSchema, 'PARAMS'),
        validate(bargainSchema)
    )
    async bargain(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as CreateBargainDTO;

        await productService.bargain(userId, productId, body);

        return sendResponse(res, {
            message: 'Sent bargain price request for current product!'
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
        validate(updateSchema))
    async update(req: Request, res: Response) {
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as ProductType;

        await productService.update(productId, body);

        return sendResponse(res, {
            message: 'Successfully updated a product'
        });
    }

    @ReqHandler(
        'DELETE', '/:productId',
        authenticate(),
        validate(productIdSchema, 'PARAMS'))
    async delete(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;

        await productService.delete(userId, productId);

        return sendResponse(res, {
            message: 'Successfully deleted a product'
        });
    }

}