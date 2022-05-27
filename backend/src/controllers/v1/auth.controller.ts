import authenticate from '../../middlewares/authenticate.middleware';
import validate from '../../middlewares/validate.middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../../services/auth.service';
import { loginSchema, registerSchema } from '../../validations/user.validation';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';

import {
    sendResponse,
    sendAuthTokens,
    REFRESH_TOKEN_COOKIE
} from '../../utils/api.util';

import type {
    LoginType,
    RegisterType
} from '../../validations/user.validation';

@Controller({ path: 'auth' })
export class AuthRoute {

    @ReqHandler('POST', '/login', validate(loginSchema))
    async login(req: Request, res: Response) {
        const body = req.body as LoginType;
        const tokens = await authService.login(body);

        return sendAuthTokens(res, tokens);
    }

    @ReqHandler('POST', '/register', validate(registerSchema))
    async register(req: Request, res: Response) {
        const body = req.body as RegisterType;
        await authService.register(body);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully registered new user'
        });
    }

    @ReqHandler('POST', '/refresh', authenticate('REFRESH'))
    async refresh(req: Request, res: Response) {
        const { userPayload } = req;
        const accessToken = await authService.generateToken(
            userPayload!, 'ACCESS');

        return sendResponse(res, {
            message: 'Successfully refreshed new token',
            data: { accessToken }
        });
    }

    @ReqHandler('DELETE', '/logout', authenticate('REFRESH'))
    async logout(req: Request, res: Response) {
        const token = authService.getTokenFromRequest(req, 'REFRESH')!;
        await authService.logout(token);

        res.clearCookie(REFRESH_TOKEN_COOKIE);

        return sendResponse(res, {
            statusCode: StatusCodes.ACCEPTED,
            message: 'Successfully logged out'
        });
    }

}