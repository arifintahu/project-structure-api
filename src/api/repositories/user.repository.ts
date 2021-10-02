import { User } from '../models';

export async function findAll(): Promise<User[]> {
  return await User.findAll();
}
