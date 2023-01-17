import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin } from '../apis/auth';
import { postSignUp } from '../apis/signup';
import { signUpIsValid } from '../utils/signUpIsValid';
import { signUpValidate } from '../utils/signUpValidate';
import { ROUTES } from './../constants/routes';

const getDateInfo = (date: Dayjs) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  day: date.get('date'),
});

const error = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: '',
  job: '',
};

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: getDateInfo(dayjs(new Date())),
  job: '',
};

const useSignUpForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(error);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'fullName') {
      const newValue = value.replace(/^\s/g, '').replace(/\s{2,}/g, ' ');
      setValues({ ...values, [name]: newValue });
    } else setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) setValues({ ...values, date: getDateInfo(newValue) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newError = signUpValidate(values);
    setErrors(newError);

    if (signUpIsValid(newError)) {
      setIsLoading(true);
      try {
        await postSignUp(values);
        await signin({ email: values.email, password: values.password });
        navigate(ROUTES.HOME);
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
    handleDateChange,
    errors,
  };
};

export default useSignUpForm;
