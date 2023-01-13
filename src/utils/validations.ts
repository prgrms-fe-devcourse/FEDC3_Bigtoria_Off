export const validateSignInInput = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors = { email: '', password: '' };
  const emailRegExp =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  let isPassed = false;

  if (!email) errors.email = '이메일을 입력해주세요.';
  if (!password) errors.password = '비밀번호를 입력해주세요.';
  if (email && !emailRegExp.test(email))
    errors.email = '올바른 이메일을 입력해주세요.';
  if (errors.email === '' && errors.password === '') isPassed = true;

  return {
    isPassed,
    errors,
  };
};

export const isBlankString = (string: string) => {
  return string.trim().length === 0;
};
