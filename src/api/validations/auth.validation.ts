import { emailRegex, FormLogin, FormRegister } from '../interfaces';

export function login(params: FormLogin): boolean {
  const { email, password } = params;
  if (!email || !password || !emailRegex.test(email)) {
    return false;
  }
  return true;
}

export function registerAccount(params: FormRegister): boolean {
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
