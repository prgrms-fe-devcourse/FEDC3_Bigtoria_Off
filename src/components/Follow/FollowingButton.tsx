import { Box, Button, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { MouseEvent, useState } from 'react';

interface Props {
  isLoading?: boolean;
  followId: string;
  userId: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const FollowingButton = ({ isLoading, followId, userId, onClick }: Props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Button
          variant={toggle ? 'contained' : 'outlined'}
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
          onClick={(e) => {
            onClick(e);
            setToggle(!toggle);
          }}>
          {toggle ? '팔로우' : '삭제'}
        </Button>
        {isLoading && (
          <CircularProgress
            size={20}
            sx={{
              color: lightBlue[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-10px',
              marginLeft: '-10px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default FollowingButton;
