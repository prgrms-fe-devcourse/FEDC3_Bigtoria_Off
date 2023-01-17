import styled from '@emotion/styled';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
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

const PasswordModal = ({ open, handleOpen }: Props) => {
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
      errors.oldValue = '기존 비밀번호를 입력해 주세요.';
    if (isBlankString(newValue))
      errors.newValue = '새 비밀번호를 입력해 주세요.';
    if (isBlankString(newValueCheck))
      errors.newValueCheck = '새 비밀번호 확인을 입력해 주세요.';
    if (newValue !== newValueCheck)
      errors.newValueCheck = '비밀번호가 일치하지 않습니다';
    if (oldValue === newValue) errors.newValue = '기존 비밀번호와 일치합니다.';

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
    setErrors(initialErrors);
  };

  return (
    <Modal open={open} onClose={handleOpen}>
      <ContentWrapper>
        <Typography variant='h6' component='h2'>
          비밀번호 변경
        </Typography>
        <Form onSubmit={handleSubmit}>
          <InputDiv>
            <TextField
              type='password'
              name='oldValue'
              placeholder='기존 비밀번호'
              size='small'
              fullWidth
              onChange={handleChange}
            />
            {errors.oldValue && <ErrorText>{errors.oldValue}</ErrorText>}
          </InputDiv>
          <InputDiv>
            <TextField
              type='password'
              name='newValue'
              placeholder='새 비밀번호'
              size='small'
              fullWidth
              onChange={handleChange}
            />
            {errors.newValue && <ErrorText>{errors.newValue}</ErrorText>}
          </InputDiv>
          <InputDiv>
            <TextField
              type='password'
              name='newValueCheck'
              placeholder='새 비밀번호 확인'
              size='small'
              fullWidth
              onChange={handleChange}
            />
            {errors.newValueCheck && (
              <ErrorText>{errors.newValueCheck}</ErrorText>
            )}
          </InputDiv>
          <Button type='submit' disabled={isLoading} fullWidth>
            비밀번호 변경
          </Button>
        </Form>
      </ContentWrapper>
    </Modal>
  );
};

export default PasswordModal;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 5px 5px grey;
`;

const Form = styled.form`
  width: 100%;
  padding-top: 15px;
`;

const InputDiv = styled.div`
  width: 100%;
  padding-bottom: 13px;
`;

const ErrorText = styled.small`
  color: red;
`;
