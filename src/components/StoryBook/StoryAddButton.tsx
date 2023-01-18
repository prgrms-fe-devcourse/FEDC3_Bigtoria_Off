import styled from '@emotion/styled';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

interface Props {
  onClick: () => void;
}

const StoryAddButton = ({ onClick }: Props) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    onClick();
    token && navigate(ROUTES.STORY_CREATE);
    !token && navigate(ROUTES.SIGNIN);
  };

  return (
    <Container>
      <FaPen onClick={handleClick} />
    </Container>
  );
};

export default StoryAddButton;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  cursor: pointer;
`;
