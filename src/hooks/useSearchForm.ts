import { ChangeEvent, useState } from 'react';

interface Props {
  onSubmit: (keyword: string) => void;
}

const useSearhForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputClear = () => {
    setValue('');
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = value;

    if (keyword.replace(/[\s]/g, '').length) {
      onSubmit(value.trim());
    }

    setValue(value.trim());
  };

  return { value, handleInputChange, handleInputClear, handleFormSubmit };
};

export default useSearhForm;
