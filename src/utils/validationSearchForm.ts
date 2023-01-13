const ERROR_MESSAGE_NO_BLANK = '공백 문자는 허용되지 않습니다.';
const ERROR_MESSAGE_REQUIRED_KEYWORD = '검색어를 입력해주세요';

export const validateSearchInput = (keyword: string) => {
  const error = { keyword: '' };

  if (keyword.match(/[\s]/g)) error.keyword = ERROR_MESSAGE_NO_BLANK;
  if (keyword.length === 0) error.keyword = ERROR_MESSAGE_REQUIRED_KEYWORD;

  return error;
};
