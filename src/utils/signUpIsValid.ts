import { args } from '../interfaces/signUp';

export const signUpIsValid = (newError: args) => {
  const ErrorNum = 6;
  if (
    Object.values(newError).filter((item) => item === '').length === ErrorNum
  ) {
    return true;
  }
  return false;
};
