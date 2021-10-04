import { JWT_SECRET } from '../../constants';
import * as jwt from 'jsonwebtoken';

export function signToken(email: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        email: email
      },
      JWT_SECRET,
      {
        expiresIn: '7d'
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

export function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}
