import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header>
        <div>Bigtoria 로고</div>
        <div>햄버거</div>
      </Header>
      <Outlet />
    </div>
  );
};

export default Layout;

const Header = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
