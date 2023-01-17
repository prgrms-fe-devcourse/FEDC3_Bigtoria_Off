import { Box, Button, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { MouseEvent } from 'react';

interface Props {
  isLoading?: boolean;
  followId: string;
  userId: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const FollowingButton = ({ isLoading, followId, userId, onClick }: Props) => {
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
          size='small'
          sx={{
            height: '30px',
            width: '80px',
            marginRight: '0.5rem',
            padding: '0.5rem',
            boxSizing: 'border-box',
          }}
          data-followid={followId}
          data-userid={userId}
          onClick={onClick}>
          삭제
        </Button>
        {isLoading && (
          <CircularProgress
            size={20}
            sx={{
              color: lightBlue[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default FollowingButton;
