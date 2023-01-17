import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { putFullName } from '../../apis/userInfo';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { isBlankString } from '../../utils/validations';

interface Props {
  oldNickname?: string;
  open: boolean;
  handleOpen: () => void;
}

const NicknameForm = ({ oldNickname, open, handleOpen }: Props) => {
  const [value, setValue] = useState(oldNickname);
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
      setError('닉네임을 입력해 주세요');
      setIsLoading(false);
      return;
    }

    if (oldNickname === value) {
      setError('현재 닉네임과 같습니다');
      setIsLoading(false);
      return;
    }

    try {
      const user = await putFullName(value);
      console.log(user);
      alert('닉네임이 변경되었습니다.');
      handleOpen();
    } catch (error) {
      console.log(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_PUTTING_NICKNAME);
    }

    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        type='text'
        value={value}
        label='새 닉네임'
        error={!!error}
        helperText={error}
        fullWidth
        onChange={handleChange}
        sx={{ marginBottom: '20px' }}
      />
      <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
        닉네임 변경
      </Button>
    </Form>
  );
};

export default NicknameForm;

const Form = styled.form`
  margin: 15px 0;
`;
