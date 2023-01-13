import { ChangeEvent, useState } from 'react';

interface Props {
  onSubmit: (keyword: string) => void;
}

const useSearhForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState({
    keyword: '',
  });

  const ERROR_MESSAGE_NO_BLANK = '공백 문자는 허용되지 않습니다.';
  const ERROR_MESSAGE_REQUIRED_KEYWORD = '검색어를 입력해주세요';
  const validateSearchInput = (keyword: string) => {
    const error = { keyword: '' };

    if (keyword.match(/[\s]/g)) error.keyword = ERROR_MESSAGE_NO_BLANK;
    if (keyword.length === 0) error.keyword = ERROR_MESSAGE_REQUIRED_KEYWORD;

    return error;
  };

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
