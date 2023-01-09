const NotFound = () => {
  return (
    <WarningContainer>
      <WarningStatus>404</WarningStatus>
      <WarningText>Page Not Found!</WarningText>
    </WarningContainer>
  );
};

export default NotFound;

import styled from '@emotion/styled';

export const WarningContainer = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

export const WarningStatus = styled.div`
  font-size: 160px;
  color: royalblue;
`;

export const WarningText = styled.div`
  font-size: 50px;
`;
