import { ChangeEvent, useState } from 'react';

import { validateSearchInput } from '../utils/validationSearchForm';

interface Props {
  onSubmit: (keyword: string) => void;
}

const useSearchForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState({
    keyword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    const newError = validateSearchInput(keyword);
    setError(newError);

    if (!newError.keyword.length || keyword.length === 0) {
      onSubmit(keyword);
      setError({ keyword: '' });
      setValue(keyword.replace(/[\s]/g, ''));
    }
  };

  const handleInputClear = () => {
    setValue('');
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    value,
    error,
    handleInputChange,
    handleInputClear,
    handleFormSubmit,
  };
};

export default useSearchForm;
