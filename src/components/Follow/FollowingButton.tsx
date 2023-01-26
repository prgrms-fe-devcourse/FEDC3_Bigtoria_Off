import { Box, Button } from '@mui/material';
import { MouseEvent, useState } from 'react';

interface Props {
  isLoading: boolean;
  followId: string;
  userId: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const FollowingButton = ({ isLoading, followId, userId, onClick }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          marginRight: '10px',
        }}>
        <Button
          variant={isFollowing ? 'contained' : 'outlined'}
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
          disabled={isLoading}
          onClick={(e) => {
            onClick(e);
            setIsFollowing(!isFollowing);
          }}>
          {isFollowing ? '팔로우' : '언팔'}
        </Button>
      </Box>
    </Box>
  );
};

export default FollowingButton;
