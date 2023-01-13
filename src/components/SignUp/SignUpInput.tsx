import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface Props {
  placeholder: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SignUpInput = ({
  placeholder,
  type,
  name,
  errorMsg,
  value,
  onChange,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: '15px',
      }}>
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMsg ? <ErrorText>{errorMsg}</ErrorText> : null}
    </Box>
  );
};

export default SignUpInput;

const Input = styled.input`
  height: 36px;
  width: 100%;
  padding: 6px 16px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #b1b7c0;
  outline: none;
  &:focus {
    border: 2px solid royalblue;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8rem;
`;
