import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaHamburger } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { checkAuth } from '../../apis/auth';
import { TOKEN_KEY, USER_ID_KEY } from '../../constants/auth';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import useDisplayModeContext from '../../contexts/DisplayModeContext';
import useIsOverByScroll from '../../hooks/useIsOverByScroll';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';
import NotificationButton from '../Notification/NotificationButton';
import StoryAddButton from '../StoryBook/StoryAddButton';
import DarkModeSwitch from './DarkModeSwitch';

const Header = () => {
  const hasToken = getLocalStorage(TOKEN_KEY) ? true : false;
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const token = getLocalStorage(TOKEN_KEY);
  const { ref, isOverByScroll } = useIsOverByScroll();
  const [user, setUser] = useState({
    image: '',
    fullName: '',
    _id: '',
  });
  const { displayMode, toggleDisplayMode } = useDisplayModeContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await checkAuth();
      setUser({
        image: userInfo.image,
        fullName: userInfo.fullName,
        _id: userInfo._id,
      });
    };

    fetchUser();
  }, [token]);

  const handleClickDarkModeSwitch = () => {
    toggleDisplayMode();
  };

  const handleClickProfileButton = () => {
    token ? navigate(ROUTES.PROFILE) : navigate(ROUTES.SIGNIN);
  };

  const handleClickHamburgerClose = () => {
    setClick(false);
  };

  const handleClickWatchStoriesButton = () => {
    navigate(ROUTES.HOME);
  };

  const handleClickMyStoryButton = async () => {
    if (token) {
      navigate(ROUTES.STORY_BOOK_BY_USER_ID(user._id));
      return;
    }

    navigate(ROUTES.SIGNIN);
  };

  const handleClickFollowListButton = async () => {
    if (token) {
      navigate(ROUTES.FOLLOW_BY_USER_ID(user._id));
      return;
    }

    navigate(ROUTES.SIGNIN);
  };

  const handleClickAuthButton = () => {
    if (token) {
      removeLocalStorage(TOKEN_KEY);
      removeLocalStorage(USER_ID_KEY);
      location.href = ROUTES.HOME;
      return;
    }

    navigate(ROUTES.SIGNIN);
  };

  const handleClickLogo = () => {
    setClick(false);
    navigate(ROUTES.HOME);
  };

  return (
    <Container
      ref={ref}
      isOverByScroll={isOverByScroll}
      displayMode={displayMode}>
      <Logo onClick={handleClickLogo}>Bigtoria</Logo>
      <ButtonsContainer>
        <HamburgerButton onClick={handleClick}>
          {click ? <FaArrowRight fontSize={'1.25rem'} /> : <FaHamburger />}
        </HamburgerButton>
        {hasToken && (
          <>
            <NotificationButton onClick={handleClickHamburgerClose} />
            <StoryAddButton onClick={handleClickHamburgerClose} />
          </>
        )}
        <DarkModeSwitch
          displayMode={displayMode}
          onClick={handleClickDarkModeSwitch}
        />
      </ButtonsContainer>
      <Hamburger onClick={handleClick} click={click} displayMode={displayMode}>
        <NavLinks onClick={handleClickProfileButton}>
          <Avatar
            src={user.image || ''}
            alt='profile image'
            sx={{ width: '120px', height: '120px' }}
          />
          {user.fullName && <p>{user.fullName}</p>}
        </NavLinks>
        <NavLinks onClick={handleClickWatchStoriesButton}>
          스토리 구경하기
        </NavLinks>
        <NavLinks onClick={handleClickMyStoryButton}>내 스토리</NavLinks>
        {token && (
          <NavLinks onClick={handleClickFollowListButton}>팔로우 목록</NavLinks>
        )}
        <NavLinks onClick={handleClickAuthButton}>
          {token ? '로그아웃' : '로그인'}
        </NavLinks>
      </Hamburger>
    </Container>
  );
};

export default Header;

const Container = styled.header<{
  isOverByScroll: boolean;
  displayMode: string;
}>`
  background-color: ${({ displayMode }) =>
    displayMode === 'dark' ? `${COLORS.DARK_MODE_HEADER}` : `${COLORS.MAIN}`};
  position: sticky;
  top: 0;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  box-shadow: ${({ isOverByScroll }) =>
    isOverByScroll && `0px 4px 4px -4px ${COLORS.STORY_CARD_BORDER}`};
  transition: all 0.5s ease-out;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Hamburger = styled.nav<{ click: boolean; displayMode: string }>`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: absolute;
  top: 4.5rem;
  left: ${({ click }) => (click ? 0 : '-100%')};
  opacity: ${({ click }) => (click ? 1 : 0)};
  animation-name: slide;
  animation-duration: 0.5s;
  transition: all 0.5s ease;
  background: ${({ displayMode }) =>
    displayMode === 'dark' ? 'black' : 'white'};
  z-index: 999;
  padding-top: 4rem;
`;

const HamburgerButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  transform: scaleX(-1);
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  cursor: pointer;
`;

const NavLinks = styled.div`
  font-size: 1rem;
  padding: 1.5rem 0;
  font-weight: bold;
  cursor: pointer;
  p {
    text-align: center;
  }
`;
