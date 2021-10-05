import { emailRegex, FormRegister } from '../interfaces';

export function register(params: FormRegister): boolean {
  const { email, password, first_name, last_name } = params;
  if (
    !email ||
    !password ||
    !first_name ||
    !last_name ||
    !emailRegex.test(email)
  ) {
    return false;
  }
  return true;
}
