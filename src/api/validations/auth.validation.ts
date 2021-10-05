import { emailRegex, FormLogin } from '../interfaces';

export function login(params: FormLogin): boolean {
  const { email, password } = params;
  if (!email || !password || !emailRegex.test(email)) {
    return false;
  }
  return true;
}
