//interfaces

export interface FormLogin {
  email: string;
  password: string;
}

export interface FormRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const emailRegex = /\S+@\S+\.\S+/;
