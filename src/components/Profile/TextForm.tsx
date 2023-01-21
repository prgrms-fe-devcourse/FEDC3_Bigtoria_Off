import styled from '@emotion/styled';
import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

import { putUserInfo } from '../../apis/userInfo';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { isBlankString } from '../../utils/validations';

interface Props {
  type: string;
  fullName: string;
  username: string;
  open: boolean;
  handleOpen: () => void;
}

const TextForm = ({ type, fullName, username, open, handleOpen }: Props) => {
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
  const fullNameRegex = /^[A-Za-z0-9가-힣]{4,12}$/;

  useEffect(() => {
    setError('');
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validate = () => {
      let newError = '';
      if (!value || isBlankString(value)) newError = `${type}을 입력해 주세요`;
      else if (value === initialValue) newError = `현재 ${type}과 같습니다`;
      else if (type === '닉네임' && !fullNameRegex.test(value))
        newError = '영어, 숫자, 한글만 입력가능합니다.(4-12자리)';

      return newError;
    };

    try {
      const newError = validate();
      if (newError) {
        setError(newError);
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
