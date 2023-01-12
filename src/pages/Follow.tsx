import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';

import FollowList from '../components/Follow/FollowList';

const DUMMY_IMAGE =
  'data:image/jpeg;base64,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';

const Follow = () => {
  return (
    <Container>
      <Wrapper>
        <FollowList src={DUMMY_IMAGE} />
        <Button
          variant='outlined'
          size='small'
          sx={{ height: '30px', marginRight: '0.5rem' }}>
          Unfollow
        </Button>
      </Wrapper>
      <Wrapper>
        <FollowList src={DUMMY_IMAGE} />
        <Button
          variant='outlined'
          size='small'
          sx={{ height: '30px', marginRight: '0.5rem' }}>
          Unfollow
        </Button>
      </Wrapper>
      <Wrapper>
        <FollowList src={DUMMY_IMAGE} />
        <Button
          variant='outlined'
          size='small'
          sx={{ height: '30px', marginRight: '0.5rem' }}>
          Unfollow
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Follow;

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;
