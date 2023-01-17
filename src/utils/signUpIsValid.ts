interface args {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  date: string;
  job: string;
}

export const signUpIsValid = (newError: args) => {
  const ErrorNum = 6;
  if (
    Object.values(newError).filter((item) => item === '').length === ErrorNum
  ) {
    return true;
  }
  return false;
};
