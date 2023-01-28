import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import {
  Container,
  createTheme,
  Tab,
  Tabs,
  ThemeProvider,
} from '@mui/material';
import { SyntheticEvent, useLayoutEffect, useState } from 'react';

import FollowEmpty from '../components/Follow/FollowEmpty';
import FollowerButton from '../components/Follow/FollowerButton';
import FollowingButton from '../components/Follow/FollowingButton';
import FollowingList from '../components/Follow/FollowingList';
import Loading from '../components/StoryBook/Loading';
import { COLORS } from '../constants/colors';
import useDisplayModeContext from '../contexts/DisplayModeContext';
import useGetFollow from '../hooks/useGetFollow';
import useGetFollower from '../hooks/useGetFollower';

interface LinkTabProps {
  value: FOLLOW;
  label?: string;
  onClick?: () => void;
  icon: JSX.Element;
}

type FOLLOW = 'FOLLOWING' | 'FOLLOWER';

const Follow = () => {
  const [value, setValue] = useState<FOLLOW>('FOLLOWING');
  const { followerList, loading, f4f, getUserInfo, handleClick } =
    useGetFollower();
  const { displayMode } = useDisplayModeContext();

  const {
    followingList,
    loading: ingLoading,
    followLoading,
    getUserInfo: ingGetUserInfo,
    handleClick: ingHandleClick,
  } = useGetFollow();

  useLayoutEffect(() => {
    if (value === 'FOLLOWING') ingGetUserInfo();
    else getUserInfo();
  }, [value]);

  const handleChange = (e: SyntheticEvent, newValue: FOLLOW) => {
    setValue(newValue);
  };

  return (
    <Container>
      <ThemeProvider theme={tabsColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          sx={{ padding: '1rem 0 1rem 0', justifyContent: 'center' }}>
          <LinkTab
            value='FOLLOWING'
            label='FOLLOWING'
            icon={<FavoriteIcon />}
          />
          <LinkTab value='FOLLOWER' label='FOLLOWER' icon={<PeopleIcon />} />
        </Tabs>
      </ThemeProvider>
      {value === 'FOLLOWER' &&
        (loading ? (
          <Loading />
        ) : followerList.length > 0 ? (
          followerList.map(
            ({
              _id,
              followingId,
              image,
              fullName,
              isOnline,
              follower,
              coverImage,
              username,
            }) => (
              <Wrapper
                key={_id}
                display={displayMode === 'dark' ? 'dark' : 'white'}>
                <FollowingList
                  userInfo={{
                    image,
                    fullName,
                    isOnline,
                    user: follower,
                    coverImage,
                    username,
                  }}
                />
                <FollowerButton
                  followId={followingId}
                  userId={follower}
                  f4f={f4f}
                  onClick={handleClick}
                />
              </Wrapper>
            )
          )
        ) : (
          <FollowEmpty type='follower' />
        ))}

      {value === 'FOLLOWING' &&
        (ingLoading ? (
          <Loading />
        ) : followingList.length > 0 ? (
          followingList.map(
            ({
              _id,
              image,
              fullName,
              isOnline,
              user,
              coverImage,
              username,
            }) => (
              <Wrapper
                key={_id}
                display={displayMode === 'dark' ? 'dark' : 'white'}>
                <FollowingList
                  userInfo={{
                    image,
                    fullName,
                    isOnline,
                    user,
                    coverImage,
                    username,
                  }}
                />
                <FollowingButton
                  followId={_id}
                  userId={user}
                  isLoading={followLoading}
                  onClick={ingHandleClick}
                />
              </Wrapper>
            )
          )
        ) : (
          <FollowEmpty type='following' />
        ))}
    </Container>
  );
};

export default Follow;

const LinkTab = (props: LinkTabProps) => {
  const { displayMode } = useDisplayModeContext();

  return (
    <Tab
      component='div'
      sx={{ width: '50%', color: displayMode === 'dark' ? 'white' : null }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const Wrapper = styled.div<{ display: string }>`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.display === 'dark' ? COLORS.DARK_MODE_HEADER : 'white'};
`;

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
