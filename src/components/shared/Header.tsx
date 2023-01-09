import styled from '@emotion/styled';

const Header = () => {
  return (
    <Container>
      <span>Bigtoria 로고</span>
      <span>햄버거</span>
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
