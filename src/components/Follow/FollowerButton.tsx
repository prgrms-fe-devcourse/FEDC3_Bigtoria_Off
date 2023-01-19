import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Chip, createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';
import { MouseEvent, useLayoutEffect, useState } from 'react';

import { getF4FId } from '../../utils/getF4FId';

interface Props {
  followId?: string;
  userId: string;
  f4f: string[][];
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const FollowerButton = ({ followId, userId, f4f, onClick }: Props) => {
  const isF4f = getF4FId(f4f).includes(userId); //맞팔중인 아이디 확인
  const [isFollower, setIsFollower] = useState(false);

  useLayoutEffect(() => {
    if (isF4f) setIsFollower(true);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          marginRight: '10px',
        }}>
        {isFollower ? (
          <ThemeProvider theme={chipTheme}>
            <Chip
              icon={<FavoriteIcon />}
              label='맞팔중'
              variant='outlined'
              color='primary'
            />
          </ThemeProvider>
        ) : (
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
            onClick={(e) => {
              onClick(e);
              setIsFollower(!isFollower);
            }}>
            맞팔하기
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FollowerButton;

const chipTheme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
  },
  typography: {
    fontFamily: "'MaplestoryOTFLight', cursive",
  },
});
