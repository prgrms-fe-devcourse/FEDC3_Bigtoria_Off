import { ChangeEvent, useState } from 'react';

import { validateSearchInput } from '../utils/validationSearchForm';

interface Props {
  onSubmit: (keyword: string) => void;
}

const useSearhForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState({
    keyword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    const newError = validateSearchInput(keyword);
    setError(newError);

    setValue(keyword.replace(/[\s]/g, ''));
  };

  const handleInputClear = () => {
    setValue('');
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = value;

    const newError = validateSearchInput(keyword);
    setError(newError);

    !newError.keyword.length && onSubmit(keyword);
  };

  return {
    value,
    error,
    handleInputChange,
    handleInputClear,
    handleFormSubmit,
  };
};

export default useSearhForm;
