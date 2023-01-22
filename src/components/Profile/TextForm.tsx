import styled from '@emotion/styled';
import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

import { putUserInfo } from '../../apis/userInfo';
import { getUserList } from '../../apis/userList';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { User } from '../../interfaces/user';
import { isBlankString } from '../../utils/validations';

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
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setError('');
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const validate = (regex: RegExp) => {
    let error = '';

    if (!value || isBlankString(value)) error = `${type}을 입력해 주세요`;
    else if (value === initialValue) error = `현재 ${type}과 같습니다`;
    else if (!regex.test(value)) error = `${placeholder}만 입력 가능합니다.`;

    return error;
  };

  const checkDuplicate = async () => {
    const userList = await getUserList();
    const nameList = userList.map((user: User) => user.fullName);
    if (nameList.includes(value)) {
      alert('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newError = '';
      if (type === '닉네임') {
        newError = validate(/^[A-Za-z0-9가-힣]{2,8}$/);
        await checkDuplicate();
        if (!isChecked) {
          setIsLoading(false);
          return;
        }
      } else if (type === '직업') {
        newError = validate(/^[가-힣]{2,6}$/);
      }

      if (newError) {
        setError(newError);
        setIsLoading(false);
        return;
      }

      if (type === '닉네임' && isChecked) {
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
