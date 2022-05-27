import dotenv from 'dotenv';

import type { CorsOptions } from 'cors';

dotenv.config();

const { env } = process;
const corsOption: CorsOptions = {
    origin: ['http://localhost:3000'],
    /** Some legacy browsers (IE11, various SmartTVs) choke on 204 */
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true
};

const config = {
    jwt: {
        accessSecret: env.JWT_ACCESS_SECRET!,
        refreshSecret: env.JWT_REFRESH_SECRET!,

        accessExpire: env.JWT_ACCESS_EXPIRE!,
        refreshExpire: env.JWT_REFRESH_EXPIRE!,

        notBefore: '3s'
    },
    hashRounds: 12,
    db: {
        host: env.DB_HOST!,
        port: parseInt(env.DB_PORT!),
        database: env.DB_DATABASE!,
        username: env.DB_USERNAME!,
        password: env.DB_PASSWORD!
    },
    cors: corsOption,
    isDev: (env.NODE_ENV === 'development')
};

export default config;