import { Login } from '../models';
import { FormLogin } from '../interfaces';

export async function isEmailExist(email: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const login = await Login.findOne({
      where: {
        email: email
      }
    }).catch((err) => {
      reject(err);
    });

    if (!login) {
      resolve(false);
    }
    resolve(true);
  });
}

export async function create(data: FormLogin): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const login = await Login.create(data).catch((err) => {
      reject(err);
    });
    if (!login) {
      resolve(false);
    }
    resolve(true);
  });
}

export async function findOne(email: string): Promise<Login | null> {
  return new Promise(async (resolve) => {
    const login = await Login.findOne({
      where: {
        email: email
      }
    });
    resolve(login);
  });
}
