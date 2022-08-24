import 'express';

declare global {
    namespace Express {
        interface Request {
            userdata: Record<string, unknown>;
        }
    }
}
