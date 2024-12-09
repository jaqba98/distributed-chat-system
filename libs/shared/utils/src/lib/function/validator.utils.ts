import { isEmailRegex } from '../const/regex.const';

export const validateEmail = (email: string) => isEmailRegex.test(email);
