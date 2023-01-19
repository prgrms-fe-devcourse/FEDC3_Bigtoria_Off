import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import { createTheme, Tab, Tabs, ThemeProvider } from '@mui/material';
import { SyntheticEvent, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { checkAuth } from '../../apis/auth';
import { TOKEN_KEY } from '../../constants/auth';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

interface LinkTabProps {
  label?: string;
  onClick?: () => void;
  icon: JSX.Element;
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component='div'
      sx={{ width: '50%' }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const FollowHeader = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const token = getLocalStorage(TOKEN_KEY);
  const location = useLocation().pathname.split('/')[1];

  useLayoutEffect(() => {
    if (location === 'follow') {
      setValue(0);
    } else if (location === 'follower') {
      setValue(1);
    }
  }, [location]);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickFollowListButton = async () => {
    if (token) {
      const { _id: userId } = await checkAuth();
      navigate(ROUTES.FOLLOW_BY_USER_ID(userId));
      return;
    }
  };

  const handleClickFollowerListButton = async () => {
    if (token) {
      const { _id: userId } = await checkAuth();
      navigate(ROUTES.FOLLOWER_BY_USER_ID(userId));
      return;
    }
  };

  return (
    <ThemeProvider theme={tabsColor}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        sx={{ margin: '1rem 0 1rem 0', justifyContent: 'center' }}>
        <LinkTab
          icon={<FavoriteIcon />}
          label='FOLLOWING'
          onClick={handleClickFollowListButton}
        />
        <LinkTab
          icon={<PeopleIcon />}
          label='FOLLOWER'
          onClick={handleClickFollowerListButton}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default FollowHeader;

const tabsColor = createTheme({
  palette: {
    primary: {
      main: COLORS.SUB,
    },
  },
  typography: {
    fontFamily: "'MaplestoryOTFLight', cursive",
  },
});
