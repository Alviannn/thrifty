import { Request, Response } from 'express';
import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';
import authenticate from '../../middlewares/authenticate.middleware';
import validate from '../../middlewares/validate.middleware';
import { bargainService } from '../../services/bargain.service';
import { sendResponse } from '../../utils/api.util';
import type {
    BargainIdDTO, CreateBargainDTO, UpdateBargainDTO
} from '../../validations/bargain-request.validation';
import {
    bargainIdSchema, bargainSchema, updateBargainSchema
} from '../../validations/bargain-request.validation';
import type { ProductIdType } from '../../validations/product.validation';
import {
    productIdSchema
} from '../../validations/product.validation';


@Controller({ path: 'bargains' })
export class BargainRequestRoute {

    @ReqHandler('GET', '/', authenticate())
    async allOwned(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const bargains = await bargainService.allOwned(userId);

        return sendResponse(res, {
            message: 'Found requested bargains',
            data: {
                bargains
            }
        });
    }

    @ReqHandler(
        'GET', '/:productId',
        authenticate(),
        validate(productIdSchema, 'PARAMS')
    )
    async getAll(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;

        const bargains = await bargainService.getAll(userId, productId);

        return sendResponse(res, {
            message: 'Successfully get all bargain requests',
            data: {
                bargains
            }
        });
    }

    @ReqHandler(
        'POST', '/:productId',
        authenticate(),
        validate(productIdSchema, 'PARAMS'),
        validate(bargainSchema)
    )
    async create(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { productId } = req.params as unknown as ProductIdType;
        const body = req.body as CreateBargainDTO;

        await bargainService.create(userId, productId, body);

        return sendResponse(res, {
            message: 'Sent bargain price request for current product!'
        });
    }

    @ReqHandler(
        'PUT', '/:productId/:bargainId',
        authenticate(),
        validate(productIdSchema, 'PARAMS'),
        validate(bargainIdSchema, 'PARAMS'),
        validate(updateBargainSchema)
    )
    async update(req: Request, res: Response) {
        const {
            bargainId,
            productId
        } = req.params as unknown as (ProductIdType & BargainIdDTO);

        const { id: userId } = req.userPayload!;
        const { status } = req.body as UpdateBargainDTO;

        await bargainService.update(userId, productId, bargainId, status);

        return sendResponse(res, {
            message: 'Successfully updated bargain request'
        });
    }

}