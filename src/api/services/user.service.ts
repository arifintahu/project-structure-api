import { User } from '../models';
import { userRepository } from '../repositories';

export function findAll(): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}
