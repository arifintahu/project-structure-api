import { User } from '../models';
import { RegisterUser } from '../interfaces';

export async function create(data: RegisterUser): Promise<User | void> {
  return new Promise(async (resolve, reject) => {
    const user = await User.create(data).catch((err) => {
      reject(err);
    });
    resolve(user);
  });
}

export async function findAll(): Promise<User[]> {
  return await User.findAll();
}
