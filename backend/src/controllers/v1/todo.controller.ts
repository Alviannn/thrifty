import validate from '../../middlewares/validate.middleware';
import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/api.util';
import { todoService } from '../../services/todo.service';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';

import {
    newTodoSchema,
    updateTodoSchema,
    todoIdSchema
} from '../../validations/todo.validation';

import type {
    NewTodoType,
    UpdateTodoType,
    TodoIdType
} from '../../validations/todo.validation';

@Controller({ path: 'todos', middlewares: [authenticate()] })
export class TodosRoute {

    @ReqHandler('GET', '/')
    async getAll(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const todos = await todoService.getAll(userId);

        return sendResponse(res, {
            message: 'Successfully found todos',
            data: { todos }
        });
    }

    @ReqHandler('POST', '/', validate(newTodoSchema))
    async add(req: Request, res: Response) {
        const { content } = req.body as NewTodoType;
        const { id: userId } = req.userPayload!;

        const todoId = await todoService.add(userId, content);

        return sendResponse(res, {
            message: 'Successfully added new todo',
            statusCode: StatusCodes.CREATED,
            data: { todoId }
        });
    }

    @ReqHandler('GET', '/:todoId', validate(todoIdSchema, 'PARAMS'))
    async getById(req: Request, res: Response) {
        const { todoId } = req.params as unknown as TodoIdType;
        const { id: userId } = req.userPayload!;

        const todo = await todoService.get(userId, todoId);

        return sendResponse(res, {
            message: 'Successfully found todo',
            data: { todo }
        });
    }

    @ReqHandler('DELETE', '/:todoId', validate(todoIdSchema, 'PARAMS'))
    async delete(req: Request, res: Response) {
        const { todoId } = req.params as unknown as TodoIdType;
        const { id: userId } = req.userPayload!;

        await todoService.delete(userId, todoId);

        return sendResponse(res, { message: 'Successfully deleted a todo' });
    }

    @ReqHandler(
        'PATCH', '/:todoId',
        validate(updateTodoSchema),
        validate(todoIdSchema, 'PARAMS')
    )
    async update(req: Request, res: Response) {
        const { content, isDone } = req.body as UpdateTodoType;
        const { todoId } = req.params as unknown as TodoIdType;
        const { id: userId } = req.userPayload!;

        await todoService.update(userId, todoId, content, isDone);

        return sendResponse(res, { message: 'Successfully updated todo' });
    }

}