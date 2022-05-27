import validate from '../../middlewares/validate.middleware';
import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { bargainSchema } from '../../validations/bargain-request.validation';
import { bargainService } from '../../services/bargain.service';
import {
    productIdSchema,
} from '../../validations/product.validation';

import {
    Controller, ReqHandler
} from '../../internals/decorators/express.decorator';
import type {
    CreateBargainDTO
} from '../../validations/bargain-request.validation';
import type {
    ProductIdType
} from '../../validations/product.validation';

@Controller({ path: 'bargains' })
export class BargainRequestRoute {

    @ReqHandler(
        'POST', '/:productId/bargains',
        authenticate(),
        validate(productIdSchema, 'PARAMS'),
        validate(bargainSchema)
    )
    async makeBargain(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as CreateBargainDTO;

        await bargainService.requestBargain(userId, productId, body);

        return sendResponse(res, {
            message: 'Sent bargain price request for current product!'
        });
    }

    @ReqHandler(
        'GET', '/:productId/bargains',
        authenticate(),
        validate(productIdSchema, 'PARAMS')
    )
    async allBargains(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;

        const bargains = await bargainService.viewBargains(userId, productId);

        return sendResponse(res, {
            message: 'Successfully get all bargain requests',
            data: {
                bargains
            }
        });
    }

}