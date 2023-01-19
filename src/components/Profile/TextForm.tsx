import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
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
  const [initialValue, job, date] = useMemo(() => {
    let initialValue = '';
    const job = username ? JSON.parse(username).job : '';
    const date = username ? JSON.parse(username).date : {};
    if (type === '닉네임') {
      initialValue = fullName;
    } else if (type === '직업') {
      initialValue = job;
    }

    return [initialValue, job, date];
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
            date,
          })
        );
      } else if (type === '직업') {
        await putUserInfo(
          fullName,
          JSON.stringify({
            job: value,
            date,
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
    <Form onSubmit={handleSubmit}>
      <TextField
        type='text'
        value={value}
        label={`새 ${type}`}
        error={!!error}
        color='warning'
        helperText={error}
        fullWidth
        onChange={handleChange}
        sx={{ marginBottom: '20px' }}
      />
      <ButtonWrapper>
        <Button
          type='button'
          variant='outlined'
          color='warning'
          disabled={isLoading}
          fullWidth
          onClick={handleOpen}>
          취소
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='warning'
          disabled={isLoading}
          fullWidth>
          {type} 변경
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default TextForm;

const Form = styled.form`
  margin: 15px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
