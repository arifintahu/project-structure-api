import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

const HEADER_NAME = 'X-Request-Id';

function requestIdMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const requestId =
        (req.headers[HEADER_NAME.toLowerCase()] as string) || randomUUID();
    req.requestId = requestId;
    res.setHeader(HEADER_NAME, requestId);
    next();
}

export default requestIdMiddleware;
