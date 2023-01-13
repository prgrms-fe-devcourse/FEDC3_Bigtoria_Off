import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import StoryAddButton from '../components/StoryBook/StoryAddButton';
import { ROUTES } from '../constants/routes';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, isLoading } = useFetchStories();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.STORY_CREATE);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      {storiesByYear.map(({ year, stories }) => {
        return <StoriesByYear key={year} year={year} stories={stories} />;
      })}
      {/* todo - 1: 스토리 추가 버튼은 어디에 둘 지 */}
      {/* todo - 2: 로그인 한 유저만 스토리 추가 버튼이 보이게 해야 함. 유리님이 만드신 checkAuth api 머지되면 그거 사용할게요! */}
      <StoryAddButton onClick={handleClick} />
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding-left: 1rem;
`;
