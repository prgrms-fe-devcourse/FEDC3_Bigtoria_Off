import styled from '@emotion/styled';
import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

import { putUserInfo } from '../../apis/userInfo';
import { getUserList } from '../../apis/userList';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { User } from '../../interfaces/user';

interface Props {
  type: string;
  fullName: string;
  username: string;
  open: boolean;
  placeholder: string;
  handleOpen: () => void;
}

const TextForm = ({
  type,
  fullName,
  username,
  open,
  placeholder,
  handleOpen,
}: Props) => {
  const [initialValue, job, year, month, day] = useMemo(() => {
    const { job, year, month, day } = JSON.parse(username);

    let initialValue = '';
    if (type === '닉네임') {
      initialValue = fullName;
    } else if (type === '직업') {
      initialValue = job;
    }

    return [initialValue, job, year, month, day];
  }, [username]);

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/\s/g, ''));
  };

  const checkDuplicate = async () => {
    const userList = await getUserList();
    const nameList = userList.map((user: User) => user.fullName);
    return nameList.includes(value);
  };

  const validateNickname = async () => {
    const nicknameRegex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,8}$/;
    const koreanRegex = /^[A-Za-z0-9가-힣]{2,8}$/;
    let error = '';

    if (!value) error = '닉네임을 입력해 주세요';
    else if (value === initialValue) error = '현재 닉네임과 같습니다';
    else if (await checkDuplicate()) {
      error = '중복된 닉네임 입니다. 다른 닉네임을 입력해 주세요.';
    } else if (!nicknameRegex.test(value))
      error = '영어, 한글, 숫자 (2~8자리)로 입력해 주세요.';
    else if (!koreanRegex.test(value))
      error =
        '한글은 완성된 단어로 입력해 주세요(자음과 모음은 독립적으로 사용이 불가능합니다).';

    return error;
  };

  const validateJob = () => {
    const jobRegex = /^[가-힣]{2,6}$/;
    let error = '';

    if (!value) error = '직업을 입력해 주세요.';
    else if (value === initialValue) error = '현재 직업과 같습니다';
    else if (!jobRegex.test(value)) error = '한글만 입력가능합니다.';

    return error;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let newError = '';
    if (type === '닉네임') {
      newError = await validateNickname();
    } else if (type === '직업') {
      newError = validateJob();
    }

    if (newError) {
      setError(newError);
      setIsLoading(false);
      return;
    }

    try {
      if (error) {
        setIsLoading(false);
        return;
      }
      if (type === '닉네임') {
        await putUserInfo(
          value,
          JSON.stringify({
            job,
            year,
            month,
            day,
          })
        );
      } else if (type === '직업') {
        await putUserInfo(
          fullName,
          JSON.stringify({
            job: value,
            year,
            month,
            day,
          })
        );
      }
      alert(`${type}이 변경되었습니다.`);
      handleOpen();
      location.reload();
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_PUTTING_NICKNAME);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TitleWrapper>
        <TextField
          type='text'
          value={value}
          label={`새 ${type}`}
          error={!!error}
          color='warning'
          helperText={error}
          placeholder={placeholder}
          fullWidth
          onChange={handleChange}
        />
      </TitleWrapper>
      <Stack
        direction='row'
        spacing={0}
        justifyContent='center'
        sx={{ width: '100%' }}>
        <Button
          type='button'
          variant='outlined'
          color='warning'
          disabled={isLoading}
          size='large'
          onClick={handleOpen}
          sx={{
            width: '50%',
          }}>
          취소
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='warning'
          disabled={isLoading}
          sx={{ width: '50%' }}>
          {type} 변경
        </Button>
      </Stack>
    </form>
  );
};

export default TextForm;

const TitleWrapper = styled.div`
  margin: 15px;
`;
