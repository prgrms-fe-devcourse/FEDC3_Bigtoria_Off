import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { putPassword } from '../../apis/userInfo';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { isBlankString } from '../../utils/validations';

interface Props {
  open: boolean;
  handleOpen: () => void;
}

const initialValues = {
  oldValue: '',
  newValue: '',
  newValueCheck: '',
};

const initialErrors = {
  oldValue: '',
  newValue: '',
  newValueCheck: '',
};

const PasswordForm = ({ open, handleOpen }: Props) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setErrors(initialValues);
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    const { oldValue, newValue, newValueCheck } = values;
    const errors = { oldValue: '', newValue: '', newValueCheck: '' };

    if (isBlankString(oldValue))
      errors.oldValue = '현재 비밀번호를 입력해 주세요.';
    if (isBlankString(newValue))
      errors.newValue = '새 비밀번호를 입력해 주세요.';
    else if (oldValue === newValue) {
      errors.newValue = '현재 비밀번호와 일치합니다.';
    }
    if (isBlankString(newValueCheck))
      errors.newValueCheck = '새 비밀번호 확인을 입력해 주세요.';
    else if (newValue !== newValueCheck)
      errors.newValueCheck = '비밀번호가 일치하지 않습니다';

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validate();
    const errorValues = Object.values(newErrors);
    const isValidate =
      errorValues.filter((error) => error === '').length === errorValues.length;
    if (!isValidate) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await putPassword(values.newValue);
      alert('비밀번호가 변경되었습니다.');
      handleOpen();
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_PUTTING_PASSWORD);
    }

    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputDiv>
        <TextField
          type='password'
          name='oldValue'
          label='현재 비밀번호'
          size='small'
          error={!!errors.oldValue}
          helperText={errors.oldValue}
          fullWidth
          onChange={handleChange}
        />
      </InputDiv>
      <InputDiv>
        <TextField
          type='password'
          name='newValue'
          label='새 비밀번호'
          size='small'
          error={!!errors.newValue}
          helperText={errors.newValue}
          fullWidth
          onChange={handleChange}
        />
      </InputDiv>
      <InputDiv>
        <TextField
          type='password'
          name='newValueCheck'
          label='새 비밀번호 확인'
          size='small'
          error={!!errors.newValueCheck}
          helperText={errors.newValueCheck}
          fullWidth
          onChange={handleChange}
        />
      </InputDiv>
      <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
        비밀번호 변경
      </Button>
    </Form>
  );
};

export default PasswordForm;

const Form = styled.form`
  width: 100%;
  padding-top: 15px;
`;

const InputDiv = styled.div`
  width: 100%;
  padding-bottom: 13px;
`;
