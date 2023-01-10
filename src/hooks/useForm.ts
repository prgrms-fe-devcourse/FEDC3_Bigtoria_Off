import { ChangeEvent, FormEvent, useState } from 'react';

interface Props<T> {
  onSubmit?: (args: T) => void;
}

const useForm = <T>({ onSubmit }: Props<T>) => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birth: '',
    career: '',
  });
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [careerError, setCareerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!values.fullName) setFullNameError('닉네임을 입력해주세요.');
    else setFullNameError('');
    if (!values.email) setEmailError('이메일을 입력해주세요.');
    else setEmailError('');
    if (!values.password) setPasswordError('비밀번호를 입력해주세요.');
    else setPasswordError('');
    if (!values.passwordConfirm)
      setPasswordConfirmError('비밀번호를 확인해주세요.');
    else setPasswordConfirmError('');
    if (!values.birth) setBirthError('출생연도를 입력해주세요.');
    else setBirthError('');
    if (!values.career) setCareerError('직업을 입력해주세요.');
    else setCareerError('');

    setIsLoading(false);
  };

  return {
    values,
    isLoading,
    handleSubmit,
    handleChange,
    fullNameError,
    emailError,
    passwordError,
    passwordConfirmError,
    birthError,
    careerError,
  };
};

export default useForm;
