const ERROR_MESSAGE_NO_BLANK = '공백 문자는 허용되지 않습니다.';

export const validateSearchInput = (keyword: string) => {
  const error = { keyword: '' };

  if (keyword.match(/[\s]/g)) error.keyword = ERROR_MESSAGE_NO_BLANK;

  return error;
};
