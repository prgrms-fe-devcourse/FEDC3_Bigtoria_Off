import styled from '@emotion/styled';
import { Box } from '@mui/material';

interface Props {
  placeholder: string;
  type: string;
}

const SignUpInput = ({ placeholder, type }: Props) => {
  return (
    <Box sx={{ width: '100%', alignItems: 'center', position: 'relative' }}>
      <Input placeholder={placeholder} type={type} />
    </Box>
  );
};

export default SignUpInput;

const Input = styled.input`
  height: 36px;
  width: 100%;
  padding: 6px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #b1b7c0;
  outline: none;
  &:focus {
    border: 2px solid royalblue;
  }
`;
