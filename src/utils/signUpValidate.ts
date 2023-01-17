import { args } from '../interfaces/signUp';

export const signUpValidate = (values: args) => {
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const newError = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    date: '',
    job: '',
  };

  if (!values.fullName) newError.fullName = '닉네임을 입력해 주세요.';
  else newError.fullName = '';

  if (!values.email) newError.email = '이메일을 입력해 주세요.';
  else if (!emailRegex.test(values.email))
    newError.email = '올바른 이메일 형식이 아닙니다.';
  else newError.email = '';

  if (!values.password) newError.password = '비밀번호를 입력해 주세요.';
  else if (!passwordRegex.test(values.password))
    newError.password = '8자리 이상 입력해 주세요.';
  else newError.password = '';

  if (!values.passwordConfirm)
    newError.passwordConfirm = '비밀번호를 확인해 주세요.';
  else if (values.password !== values.passwordConfirm)
    newError.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  else newError.passwordConfirm = '';

  if (!values.date) newError.date = '생년월일을 선택해 주세요.';
  else newError.date = '';

  if (!values.job) newError.job = '직업을 입력해 주세요.';
  else newError.job = '';

  return newError;
};
