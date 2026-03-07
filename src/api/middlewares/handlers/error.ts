import { NextFunction, Request, Response } from 'express';
import AppConfig from '../../../config/appConfig';
import Logger from '../../../utils/logger';

type ResponseType = {
    message?: string;
};

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    const response: ResponseType = {};
    if (err.message) {
        const logs = {
            type: err.name,
            message: err.message,
            method: req.method,
            path: req.path,
            params: req.route?.path,
            body: req.body,
            query: req.query,
            stack: err.stack
        };
        Logger.error(JSON.stringify(logs));
        response.message = AppConfig.app.isDevelopment
            ? err.message
            : 'Something wrong!';
    }

    const statusCode =
        (err as Error & { statusCode?: number }).statusCode || 500;
    res.status(statusCode).send(response);
}

export default errorHandler;
