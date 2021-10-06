import { Login } from '../models';
import { loginRepository } from '../repositories';
import { FormLogin, Token } from '../interfaces';
import { signToken } from '../helpers/token';
import * as bcrypt from 'bcrypt';

export function getMeta(params: { userdata: string }): Promise<Login | null> {
  return new Promise(async (resolve) => {
    const login: Login | null = await loginRepository.getMeta(params.userdata);
    resolve(login);
  });
}

export function login(params: FormLogin): Promise<Token> {
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
      const expires = '1d';
      const token = await signToken(params.email, expires);
      if (!token) {
        reject('Invalid token');
      }
      resolve({
        token: `Bearer ${token}`,
        expires: expires
      });
    } catch (err) {
      reject(err);
    }
  });
}
