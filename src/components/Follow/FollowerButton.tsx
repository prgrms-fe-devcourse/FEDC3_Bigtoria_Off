import { Box, Button } from '@mui/material';
import { MouseEvent } from 'react';

import { getF4FId } from '../../utils/getF4FId';

interface Props {
  followId?: string;
  userId: string;
  f4f: string[][];
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const FollowerButton = ({ followId, userId, f4f, onClick }: Props) => {
  const isF4f = getF4FId(f4f).includes(userId); //맞팔중인 아이디 확인

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Button
          variant='outlined'
          color='warning'
          size='small'
          sx={{
            height: '30px',
            width: '60px',
            marginRight: '0.5rem',
            padding: '0.5rem',
            boxSizing: 'border-box',
            transition: 'background-color .3s ease-out',
          }}
          data-followid={followId}
          data-userid={userId}
          disabled={isF4f}
          onClick={onClick}>
          {isF4f ? '맞팔중' : '맞팔하기'}
        </Button>
      </Box>
    </Box>
  );
};

export default FollowerButton;
