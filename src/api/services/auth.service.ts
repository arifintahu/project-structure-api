import { User, Login } from '../models';
import { userRepository, loginRepository } from '../repositories';
import { FormLogin, FormRegister } from '../interfaces';
import { signToken } from '../helpers/token';
import * as bcrypt from 'bcrypt';

export function getMeta(): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}

export function login(params: FormLogin): Promise<string | undefined> {
  return new Promise(async (resolve, reject) => {
    try {
      const login: Login | null = await loginRepository.findOne(params.email);
      if (!login) {
        reject('Email is not exists');
      }

      const isValid = await bcrypt.compareSync(
        params.password,
        login?.getDataValue('password')
      );

      if (!isValid) {
        reject('Invalid password');
      }
      const token = await signToken(params.email);
      if (!token) {
        reject('Invalid token');
      }
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
}

export function registerAccount(params: FormRegister): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmailExist = await loginRepository.isEmailExist(params.email);
      if (isEmailExist) {
        reject('Email exists');
      }
      const hashedPassword = await bcrypt.hashSync(params.password, 5);
      const userLogin = await loginRepository.create({
        email: params.email,
        password: hashedPassword
      });
      resolve(userLogin);
    } catch (err) {
      reject(err);
    }
  });
}
