import authenticate from '../../middlewares/authenticate.middleware';
import validate from '../../middlewares/validate.middleware';

import { Request, Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { transactionSchema } from '../../validations/transaction.validation';
import { transactionService } from '../../services/transaction.service';

import type {
    CreateTransactionDTO
} from '../../validations/transaction.validation';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';

@Controller({ path: 'transactions' })
export class TransactionRoute {

    @ReqHandler(
        'POST', '/',
        authenticate(),
        validate(transactionSchema)
    )
    async sendPayment(req: Request, res: Response) {
        const body = req.body as CreateTransactionDTO;
        await transactionService.sendPayment(body);

        return sendResponse(res, { message: 'Successfully paid for product' });
    }

}