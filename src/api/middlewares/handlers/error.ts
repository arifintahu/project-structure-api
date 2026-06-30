import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import AppConfig from '../../../config/appConfig';
import Logger from '../../../utils/logger';

const SENSITIVE_FIELDS = [
    'password',
    'token',
    'authorization',
    'secret',
    'key'
];

function sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
    if (!body || typeof body !== 'object') {
        return body;
    }
    const sanitized = { ...body };
    for (const key of Object.keys(sanitized)) {
        if (
            SENSITIVE_FIELDS.some((field) => key.toLowerCase().includes(field))
        ) {
            sanitized[key] = '[REDACTED]';
        }
    }
    return sanitized;
}

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
        body: sanitizeBody(req.body as Record<string, unknown>),
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
