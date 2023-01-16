import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const StoriesFullName = ({ children }: Props) => {
  return <Typography>{children}</Typography>;
};

export default StoriesFullName;
