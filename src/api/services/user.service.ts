import { User } from '../models';
import { userRepository } from '../repositories';

export function findAll(): Promise<any> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}
