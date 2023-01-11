import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

const useSignUpForm = () => {
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!values.fullName) setFullNameError('닉네임을 입력해주세요.');
    else setFullNameError('');

    if (!values.email) setEmailError('이메일을 입력해주세요.');
    else if (!emailRegex.test(values.email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    if (!values.password) setPasswordError('비밀번호를 입력해주세요.');
    else if (!passwordRegex.test(values.password))
      setPasswordError(
        '숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요.'
      );
    else setPasswordError('');

    if (!values.passwordConfirm)
      setPasswordConfirmError('비밀번호를 확인해주세요.');
    else if (values.password !== values.passwordConfirm)
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    else setPasswordConfirmError('');

    if (!values.birth) setBirthError('출생연도를 입력해주세요.');
    else setBirthError('');

    if (!values.career) setCareerError('직업을 입력해주세요.');
    else setCareerError('');
    if (Object.values(values).filter((item) => item === '').length === 0) {
      try {
        await axios
          .post(`${import.meta.env.VITE_API_URL}/signup`, {
            email: values.email,
            fullName: values.fullName,
            password: values.password,
          })
          .then(({ data }) =>
            axios({
              url: `${import.meta.env.VITE_API_URL}/settings/update-user`,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
              },
              data: {
                fullName: values.fullName,
                username: JSON.stringify({
                  birth: values.birth,
                  career: values.career,
                }),
              },
            })
          );
        // login()
        // redirect('/')
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
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

export default useSignUpForm;
