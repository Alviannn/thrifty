import ms from 'ms';
import config from '../configs/config';

import { StatusCodes } from 'http-status-codes';

import type { Response } from 'express';
import type { AuthTokens } from '../typings/auth';

export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export interface APIResponse<T = unknown> {
    statusCode?: StatusCodes;
    success?: boolean;
    message: string;
    data?: T;
}

/**
 * Sends a JSON response
 *
 * The usual way doesn't have any template to sending responses,
 * therefore you don't get help from the autocomplete.
 */
export function sendResponse<T>(res: Response, params: APIResponse<T>) {
    const { statusCode, success, ...newParams } = params;

    const isSuccess = (success ?? true);
    const code = statusCode ?? StatusCodes.OK;

    const response = {
        status: (isSuccess ? 'success' : 'fail'),
        ...newParams
    };

    return res.status(code).json(response);
}

/**
 * Sends authentication tokens (both access and refresh tokens) securely.
 *
 * Applying the best practice for secured JWT usage, this function
 * will send the tokens separately from the `body` and `cookie`.
 *
 * The cookie is `httpOnly` which means it can't be accessed
 * from the client's browser through JavaScript.
 */
export function sendAuthTokens(res: Response, tokens: AuthTokens) {
    const { accessToken, refreshToken } = tokens;

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        maxAge: ms(config.jwt.refreshExpire)
    });

    return sendResponse(res, {
        message: 'Successfully logged in',
        data: { accessToken }
    });
}

/**
 * User-defined error for API responses
 *
 * Instead of using `try-catch` and call {@link sendResponse} on every error,
 * we could just make a error handler (for express.js) and use this class
 * to create the same effect.
 */
export class ResponseError extends Error {

    statusCode: StatusCodes;

    constructor(message: string, statusCode?: StatusCodes) {
        super(message);

        // Apparently using `instanceof` syntax doesn't work
        // when it comes to the `Error` class.
        //
        // So, to make it up for that, as an identifier we just do this.
        this.name = ResponseError.name;
        this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    }

    static toResponseBody(error: ResponseError): APIResponse {
        return {
            statusCode: error.statusCode,
            success: false,
            message: error.message
        };
    }

}

/**
 * Common API errors
 */
export const Errors = {
    /**
     * Internal server error / Unexpected error
     */
    SERVER: new ResponseError('Unexpected server error'),

    /**
     * User doesn't have JWT or authentication token
     */
    NO_SESSION: new ResponseError(
        "You don't have an account session",
        StatusCodes.UNAUTHORIZED),

    /**
     * User doesn't have the permission
     */
    NO_PERMISSION: new ResponseError(
        "You don't have the permission to access this content",
        StatusCodes.FORBIDDEN),

    /**
     * Cannot find the user it's trying to find
     */
    USER_NOT_FOUND: new ResponseError(
        'Cannot find user',
        StatusCodes.NOT_FOUND)
};