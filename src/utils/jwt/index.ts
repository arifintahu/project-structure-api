import AppConfig from '../../config/appConfig';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

class JWT {
    signToken(
        userId: number,
        expires: string = '1d'
    ): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            const options: SignOptions = {
                expiresIn: expires as any
            };
            jwt.sign(
                {
                    id: userId,
                    iat: Date.now()
                },
                AppConfig.app.secret,
                options,
                (err: Error | null, token: string | undefined) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    }

    verifyToken(token: string): Promise<JwtPayload | undefined> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, AppConfig.app.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded as JwtPayload | undefined);
            });
        });
    }
}

export default new JWT();
