const ERROR_MESSAGE_NO_BLANK = '공백 문자는 허용되지 않습니다.';
const ERROR_MESSAGE_ONLY_KO_EN_NUM =
  '영어, 숫자, 한글만 입력가능합니다.(최대 8자리)';

export const validateSearchInput = (keyword: string) => {
  const error = { keyword: '' };
  const fullNameRegex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,8}$/;

  if (keyword.match(/[\s]/g)) error.keyword = ERROR_MESSAGE_NO_BLANK;
  else if (!fullNameRegex.test(keyword))
    error.keyword = ERROR_MESSAGE_ONLY_KO_EN_NUM;

  return error;
};
