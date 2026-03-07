import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import AppConfig from '../../../config/appConfig';
import Logger from '../../../utils/logger';

interface ErrorResponse {
    message: string;
    statusCode: number;
}

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
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

    const statusCode = err instanceof AppError ? err.statusCode : 500;

    const response: ErrorResponse = {
        message: AppConfig.app.isDevelopment ? err.message : 'Something wrong!',
        statusCode
    };

    res.status(statusCode).send(response);
}

export default errorHandler;
