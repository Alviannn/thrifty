import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/api.util';

import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

type ValidationType = 'BODY' | 'PARAMS' | 'QUERY';

/**
 * Validates a request from client
 * within the middleware instead of from each controllers.
 *
 * @param schema the schema to be validated
 * @param type selects which part of the request should be validated.
 *             it defaults the `BODY` since we're mostly going to
 *             check the request body.
 */
function validate(schema: ObjectSchema, type: ValidationType = 'BODY') {
    return async (req: Request, _: Response, next: NextFunction) => {

        let targetToValidate;
        switch (type) {
            case 'BODY':
                targetToValidate = req.body;
                break;
            case 'PARAMS':
                targetToValidate = req.params;
                break;
            case 'QUERY':
                targetToValidate = req.query;
                break;
        }

        const { value, error } = schema.validate(targetToValidate);
        if (error) {
            throw new ResponseError(error.message, StatusCodes.BAD_REQUEST);
        }

        switch (type) {
            case 'BODY':
                req.body = value;
                break;
            case 'PARAMS':
                req.params = value;
                break;
            case 'QUERY':
                req.query = value;
                break;
        }

        return next();
    };
}

export type { ValidationType };
export default validate;