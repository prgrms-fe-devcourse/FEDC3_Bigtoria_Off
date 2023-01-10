import styled from '@emotion/styled';
import { useState } from 'react';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <Container>
      <span>빅토리아</span>
      <div onClick={handleClick}>
        {click ? (
          <img src='/public/icons/close.svg' />
        ) : (
          <img src='/public/icons/hamburger_menu.svg' />
        )}
      </div>
      <NavMenu onClick={handleClick} click={click}>
        <img src='/public/icons/user_profile.svg' width={120} />
        <NavLinks>스토리 구경하기</NavLinks>
        <NavLinks>내 스토리</NavLinks>
        <NavLinks>팔로우 목록</NavLinks>
        <NavLinks>로그아웃/로그인</NavLinks>
      </NavMenu>
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

const NavMenu = styled.nav<{ click: boolean }>`
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

const NavLinks = styled.div`
  font-size: 1rem;
  padding: 2rem;
  font-weight: bold;
`;
