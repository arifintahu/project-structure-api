import * as path from 'path';
import * as dotenv from 'dotenv';

export default function constantsConfig(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const PATH_ENV = path.join(__dirname, '../../.env');
      dotenv.config({
        path: PATH_ENV
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
