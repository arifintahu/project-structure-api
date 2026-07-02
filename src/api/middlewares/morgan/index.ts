import morgan, { StreamOptions } from 'morgan';
import { Request } from 'express';

import Logger from '../../../utils/logger';
import AppConfig from '../../../config/appConfig';

const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim())
};

const skip = () => {
    return !AppConfig.app.isDevelopment;
};

morgan.token('request-id', (req: Request) => req.requestId || '-');

const MorganMiddleware = morgan(
    ':request-id :method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);

export default MorganMiddleware;
