import { WarningContainer, WarningStatus, WarningText } from './style';

const NotFound = () => {
  return (
    <WarningContainer>
      <WarningStatus>404</WarningStatus>
      <WarningText>Page Not Found!</WarningText>
    </WarningContainer>
  );
};

export default NotFound;
