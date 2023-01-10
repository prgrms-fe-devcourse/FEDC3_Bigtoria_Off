import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface Props {
  name: string;
  errorMsg?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const SignUpSelector = ({ name, errorMsg, onChange }: Props) => {
  const getFullYear = () => {
    return Array(new Date().getFullYear() - 1980)
      .fill(0)
      .map((_, i) => new Date().getFullYear() - i);
  };

  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: '15px',
      }}
    >
      <Selector name={name} onChange={onChange}>
        <option value=''>출생연도</option>
        {getFullYear().map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </Selector>
      {errorMsg ? <ErrorText>{errorMsg}</ErrorText> : null}
    </Box>
  );
};

export default SignUpSelector;

const Selector = styled.select`
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
