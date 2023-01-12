import { ChangeEvent, FormEvent, useState } from 'react';

import { postSignUp } from '../apis/signup';
import { signUpIsValid } from '../utils/signUpIsValid';
import { signUpValidate } from '../utils/signUpValidate';

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  year: '',
  job: '',
};

const useSignUpForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'fullName') {
      const newValue = value.replace(/^\s/g, '').replace(/\s{2,}/g, ' ');
      setValues({ ...values, [name]: newValue });
    } else setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newError = signUpValidate(values);
    setErrors(newError);

    if (signUpIsValid(newError)) {
      setIsLoading(true);
      try {
        await postSignUp(values);
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
