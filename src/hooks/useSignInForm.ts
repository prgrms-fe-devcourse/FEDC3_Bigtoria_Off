import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin } from '../apis/auth';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { ROUTES } from '../constants/routes';
import { validateSignInInput } from './../utils/validations';

interface InitialState {
  email: string;
  password: string;
}

const useSignInForm = (initialState: InitialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const { isPassed, errors: newErrors } = validateSignInInput(values);
    if (isPassed) {
      const { isSignInFailed, errorMessage } = await signin(values);

      if (!isSignInFailed) {
        navigate(ROUTES.HOME);
        setIsLoading(false);
        return;
      }

      if (errorMessage) {
        setErrors({
          ...newErrors,
          password: errorMessage + ' ' + ERROR_MESSAGES.CHECK_EMAIL_OR_PASSWORD,
        });
        setIsLoading(false);
        return;
      }
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useSignInForm;
