import { FormRegister } from '../interfaces';
import { User } from '../models';
import { loginRepository, userRepository } from '../repositories';
import * as bcrypt from 'bcrypt';

export function findAll(): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}

export function register(params: FormRegister): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmailExist = await loginRepository.isEmailExist(params.email);
      if (isEmailExist) {
        reject('Email exists');
      }
      const hashedPassword = await bcrypt.hashSync(params.password, 5);
      const registerUser = await userRepository.create({
        first_name: params.first_name,
        last_name: params.last_name
      });
      const registerlogin = await loginRepository.create({
        email: params.email,
        password: hashedPassword,
        user_id: registerUser?.getDataValue('id')
      });
      if (!registerlogin) {
        reject('Failed to register');
      }
      resolve(registerlogin);
    } catch (err) {
      reject(err);
    }
  });
}

export function remove(params: { id: string }): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const removed = await loginRepository.remove(params.id);
      resolve(removed);
    } catch (err) {
      reject(err);
    }
  });
}
