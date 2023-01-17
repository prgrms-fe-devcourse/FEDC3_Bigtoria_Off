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

  useEffect(() => {
    setError('');
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!value || isBlankString(value)) {
      setError(`${type}을 입력해 주세요`);
      setIsLoading(false);
      return;
    }

    if (value === initialValue) {
      setError(`현재 ${type}과 같습니다`);
      setIsLoading(false);
      return;
    }

    try {
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
        helperText={error}
        fullWidth
        onChange={handleChange}
        sx={{ marginBottom: '20px' }}
      />
      <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
        {type} 변경
      </Button>
    </Form>
  );
};

export default TextForm;

const Form = styled.form`
  margin: 15px 0;
`;
