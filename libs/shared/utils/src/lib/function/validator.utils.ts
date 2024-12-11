import { isEmailRegex, isPasswordStrongRegex } from '../const/regex.const';

export const validateEmail = (email: string) => isEmailRegex.test(email);

export const validatePassword = (password: string) =>
  isPasswordStrongRegex.test(password);
