import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Empty = ({ children }: Props) => {
  return <CustomTypography>{children}</CustomTypography>;
};

export default Empty;

const CustomTypography = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
`;
