import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkAuth } from '../../apis/auth';
import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage, removeLocalStorage } from '../../utils/storage';
import NotificationButton from '../Alarm/NotificationButton';
import FontText from '../Home/FontText';
import StoryAddButton from '../StoryBook/StoryAddButton';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const token = getLocalStorage(TOKEN_KEY);

  const handleClickMyStoryButton = async () => {
    if (token) {
      const { _id: userId } = await checkAuth();
      navigate(ROUTES.STORY_BOOK_BY_USER_ID(userId));
      return;
    }

    navigate(ROUTES.SIGNIN);
  };

  const handleClickFollowListButton = () => {
    if (token) {
      navigate(ROUTES.FOLLOW);
    }
  };

  const handleClickAuthButton = () => {
    if (token) {
      removeLocalStorage(TOKEN_KEY);
      navigate(ROUTES.HOME);
      return;
    }

    navigate(ROUTES.SIGNIN);
  };

  return (
    <Container>
      <Logo onClick={() => navigate(ROUTES.HOME)}>
        <FontText
          title='B.'
          sx={{
            fontSize: '30px',
          }}
        />
      </Logo>
      <ButtonsContainer>
        <StoryAddButton />
        <NotificationButton />
        <HamburgerButton onClick={handleClick}>
          {click ? (
            <img src='/icons/close.svg' />
          ) : (
            <img src='/icons/hamburger_menu.svg' />
          )}
        </HamburgerButton>
      </ButtonsContainer>
      <Hamburger onClick={handleClick} click={click}>
        <img src='/icons/user_profile.svg' width={120} />
        <NavLinks>스토리 구경하기</NavLinks>
        <NavLinks onClick={handleClickMyStoryButton}>내 스토리</NavLinks>
        <NavLinks onClick={handleClickFollowListButton}>팔로우 목록</NavLinks>
        <NavLinks onClick={handleClickAuthButton}>
          {token ? '로그아웃' : '로그인'}
        </NavLinks>
      </Hamburger>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  position: sticky;
  top: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  z-index: 999;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Hamburger = styled.nav<{ click: boolean }>`
  width: 100%;
  display: ${({ click }) => (click ? 'flex' : 'none')};
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: absolute;
  top: 3.6rem;
  right: ${({ click }) => (click ? 0 : '-100%')};
  opacity: ${({ click }) => (click ? 1 : 0)};
  animation-name: slide;
  animation-duration: 0.5s;
  transition: all 0.5s ease;
  background: #ffffff;
  z-index: 999;
  padding-top: 4rem;

  @keyframes slide {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }
`;

const HamburgerButton = styled.div`
  cursor: pointer;
`;

const Logo = styled.h1`
  margin: 0;
  cursor: pointer;
`;

const NavLinks = styled.div`
  font-size: 1rem;
  padding: 2rem;
  font-weight: bold;
  cursor: pointer;
`;
