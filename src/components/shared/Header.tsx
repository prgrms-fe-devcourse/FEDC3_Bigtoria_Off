import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>빅토리아</Logo>
      <HamburgerButton onClick={handleClick}>
        {click ? (
          <img src='/icons/close.svg' />
        ) : (
          <img src='/icons/hamburger_menu.svg' />
        )}
      </HamburgerButton>
      <Hamburger onClick={handleClick} click={click}>
        <img src='/icons/user_profile.svg' width={120} />
        <NavLinks>스토리 구경하기</NavLinks>
        <NavLinks>내 스토리</NavLinks>
        <NavLinks>팔로우 목록</NavLinks>
        <NavLinks>로그아웃/로그인</NavLinks>
      </Hamburger>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Hamburger = styled.nav<{ click: boolean }>`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: absolute;
  top: 3.6rem;
  right: ${({ click }) => (click ? 0 : '-100%')};
  opacity: ${({ click }) => (click ? 1 : 0)};
  transition: all 0.5s ease;
  background: #167fe7;
  z-index: 999;
  padding-top: 4rem;
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
`;
