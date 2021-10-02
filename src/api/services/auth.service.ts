import { User } from '../models';
import { userRepository, loginRepository } from '../repositories';
import { FormLogin, FormRegister } from '../interfaces';
import * as bcrypt from 'bcrypt';
// import { JWT_SECRET } from '../../constants';

export function getMeta(): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}

export function login(params: FormLogin): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}

export function registerAccount(params: FormRegister): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const isEmailExist = await loginRepository.isEmailExist(params.email);
    if (isEmailExist) {
      reject();
    }
    const hashedPassword = await bcrypt.hashSync(params.password, 5);
    const userLogin = await loginRepository.create({
      email: params.email,
      password: hashedPassword
    });
    resolve(userLogin);
  });
}
