//interfaces

export interface FormLogin {
  email: string;
  password: string;
}

export interface RegisterLogin extends FormLogin {
  user_id: string;
}

export interface RegisterUser {
  first_name: string;
  last_name: string;
}

export interface FormRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface Token {
  token: string;
  expires: string;
}

export const emailRegex = /\S+@\S+\.\S+/;
