import 'express';
import { UserOutput } from '../api/models/User';

declare global {
    namespace Express {
        interface Request {
            userdata: UserOutput;
        }
    }
}
