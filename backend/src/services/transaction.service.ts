import { StatusCodes } from 'http-status-codes';
import { Transaction } from '../database/entities/transaction.entity';
import { BargainRequest } from '../database/entities/bargain-request.entity';

import type {
    CreateTransactionDTO
} from '../validations/transaction.validation';
import { ResponseError } from '../utils/api.util';

class TransactionService {

    async sendPayment(dto: CreateTransactionDTO) {
        const { bargainId, payment } = dto;

        const existingTrans = await Transaction.findOne({
            relations: { bargain: true },
            where: {
                bargain: { id: bargainId }
            }
        });

        if (existingTrans) {
            throw new ResponseError(
                'Cannot find bargain to be paid',
                StatusCodes.NOT_FOUND);
        }

        const bargain = await BargainRequest.findOneByOrFail({ id: bargainId });
        if (payment !== bargain.price) {
            throw new ResponseError(
                'User payment does not match agreement price',
                StatusCodes.BAD_REQUEST);
        }

        const trans = Transaction.create({ bargain });
        await trans.save();
    }

}

export const transactionService = new TransactionService();