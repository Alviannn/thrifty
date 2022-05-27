import authenticate from '../../middlewares/authenticate.middleware';
import validate from '../../middlewares/validate.middleware';

import { Request, Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { userService } from '../../services/user.service';
import { topupSchema } from '../../validations/topup.validation';

import type { TopupType } from '../../validations/topup.validation';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';
import type { UserIdType } from '../../validations/user.validation';
import { userIdSchema } from '../../validations/user.validation';
import { productService } from '../../services/product.service';

@Controller({ path: 'users' })
export class UserRoute {

    @ReqHandler('GET', '/profile', authenticate())
    async profile(req: Request, res: Response) {
        const { userPayload } = req;
        const user = await userService.get(userPayload!.id);

        return sendResponse(res, {
            message: 'Successfully found user data',
            data: { user }
        });
    }

    @ReqHandler(
        'POST', '/topup',
        authenticate(), validate(topupSchema)
    )
    async topup(req: Request, res: Response) {
        const { balance } = req.body as TopupType;
        const { id } = req.userPayload!;

        await userService.topup(id, balance);

        return sendResponse(res, {
            message: 'Successfully add topup'
        });
    }

    @ReqHandler('GET', '/:userId/products', validate(userIdSchema, 'PARAMS'))
    async getByUserId(req: Request, res: Response) {
        const { userId } = req.params as unknown as UserIdType;

        const products = await productService.getByUserId(userId);

        return sendResponse(res, {
            message: 'Successfully found all products',
            data: {
                products
            }
        });
    }

}