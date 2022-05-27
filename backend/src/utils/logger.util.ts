import 'winston-daily-rotate-file';
import config from '../configs/config';

import { createLogger, format, transports } from 'winston';
import { DateTime } from 'luxon';

const DATETIME_FORMAT = 'yyyy-MM-dd - HH:mm:ss ZZ';

function customPrintFormat() {
    return format.printf(
        ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
    );
}

const customTimestampFormat = format((info) => {
    const currDate = DateTime.now();
    info.timestamp = currDate.toFormat(DATETIME_FORMAT);

    return info;
});

const logger = createLogger({
    level: (config.isDev ? 'debug' : 'info'),
    format: customTimestampFormat(),
    transports: [
        new transports.DailyRotateFile({
            dirname: './logs',
            filename: '%DATE%.log',
            format: customPrintFormat()
        }),
        new transports.Console({
            format: format.combine(format.colorize(), customPrintFormat())
        })
    ]
});

export default logger;