import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkAuth } from '../../apis/auth';
import { TOKEN_KEY } from '../../constants/auth';
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
      component='button'
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    <Tabs
      value={value}
      onChange={handleChange}
      sx={{ margin: '1rem 0 1rem 0' }}>
      <LinkTab
        icon={<PeopleIcon />}
        label='FOLLOWING'
        onClick={handleClickFollowListButton}
      />
      <LinkTab
        icon={<FavoriteIcon />}
        label='FOLLOWER'
        onClick={handleClickFollowerListButton}
      />
    </Tabs>
  );
};

export default FollowHeader;
