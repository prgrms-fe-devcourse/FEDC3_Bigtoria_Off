import styled from '@emotion/styled';
import { Box } from '@mui/material';

interface Props {
  placeholder?: string;
}

const SignUpInput = ({ placeholder }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Input placeholder={placeholder} />
      </Box>
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
`;
