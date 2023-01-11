import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

import { signUpIsValid } from '../utils/signUpIsValid';
import { signUpValidate } from '../utils/signUpValidate';

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birth: '',
  career: '',
};

const useSignUpForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newError = signUpValidate(values);
    setErrors(newError);

    if (signUpIsValid(newError)) {
      setIsLoading(true);
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
          email: values.email,
          fullName: values.fullName,
          password: values.password,
          username: JSON.stringify({
            birth: values.birth,
            career: values.career,
          }),
        });
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
    errors,
  };
};

export default useSignUpForm;
