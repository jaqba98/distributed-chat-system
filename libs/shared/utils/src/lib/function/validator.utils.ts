import { isEmailRegex, isPasswordStrongRegex } from '../const/regex.const';

/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 */
export const validateEmail = (email: string) => isEmailRegex.test(email);

/**
 * Checks if a password is strong based on the following criteria:
 * - At least 8 characters long.
 * - Contains at least one uppercase letter.
 * - Contains at least one lowercase letter.
 * - Contains at least one digit.
 * - Contains at least one special character.
 *
 * @param password - The password to validate.
 * @returns `true` if the password is strong, otherwise `false`.
 */
export const validatePassword = (password: string) =>
  isPasswordStrongRegex.test(password);
