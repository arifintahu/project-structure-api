import { Login } from '../models';
import { RegisterLogin } from '../interfaces';

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

export async function create(data: RegisterLogin): Promise<boolean> {
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
        email: email,
        is_active: true
      }
    });
    resolve(login);
  });
}

export async function getMeta(email: string): Promise<Login | null> {
  return new Promise(async (resolve) => {
    const login = await Login.findOne({
      attributes: ['id', 'email', 'user_id', 'is_verify'],
      where: {
        email: email,
        is_active: true
      }
    });
    resolve(login);
  });
}

export async function remove(id: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const [result, _] = await Login.update(
      {
        is_active: false
      },
      {
        where: {
          id: id
        }
      }
    );
    if (!result) {
      resolve(false);
    }
    resolve(true);
  });
}
