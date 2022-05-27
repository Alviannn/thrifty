import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    Controller, ReqHandler
} from '../../internals/decorators/express.decorator';
import authenticate from '../../middlewares/authenticate.middleware';
import { productService } from '../../services/product.service';
import { sendResponse } from '../../utils/api.util';
import type { ProductType } from '../../validations/product.validation';

@Controller({ path: 'product' })
export class ProductRoute {

    @ReqHandler('POST', '/', authenticate())
    async add(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const body = req.body as ProductType;
        await productService.add(userId, body);

        return sendResponse(res, {
            message: 'Successfully added new product',
            statusCode: StatusCodes.CREATED
        });
    }

}