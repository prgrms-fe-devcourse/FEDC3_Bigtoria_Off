import styled from '@emotion/styled';
import { Avatar, Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import useFetchUser from '../../hooks/useFetchUser';
import { useDeleteStory } from '../../hooks/useStory';
import { StoryData } from '../../interfaces/story';
import LikeButton from './LikeButton';

interface Props {
  story: StoryData;
}

const StoryInfo = ({ story }: Props) => {
  const navigate = useNavigate();
  const { handleDelete } = useDeleteStory();
  const { user } = useFetchUser();

  const { storyTitle, year, month, day, content } = JSON.parse(story.title);

  return (
    <>
      <Box>
        <StoryHeader>
          <Typography
            variant='h3'
            gutterBottom
            sx={{ fontSize: '2rem', fontWeight: '500' }}>
            {storyTitle}
          </Typography>
          {user._id === story.author._id && (
            <Box>
              <Button
                variant='text'
                onClick={() =>
                  navigate(ROUTES.STORY_EDIT_BY_STORY_ID(story._id))
                }>
                수정
              </Button>
              <Button
                variant='text'
                onClick={() => handleDelete(story._id, story.author._id)}>
                삭제
              </Button>
            </Box>
          )}
        </StoryHeader>
        <Typography variant='subtitle1' gutterBottom>
          {year}.{month}.{day}
        </Typography>
        <Box>
          <Profile
            onClick={() =>
              navigate(ROUTES.STORY_BOOK_BY_USER_ID(story.author._id))
            }>
            <Avatar src={story.author.image} alt='profile image'></Avatar>
            <span>{story.author.fullName}</span>
          </Profile>
        </Box>
      </Box>
      <StoryContainer>
        {story.image && (
          <StoryImageWrapper>
            <StoryImage src={story.image} alt='story image' />
          </StoryImageWrapper>
        )}
        {content && (
          <Paper
            variant='outlined'
            sx={{ width: '90%', padding: '30px', margin: '20px 0' }}>
            {content}
          </Paper>
        )}
        <LikeButton likeCount={story.likes.length} />
      </StoryContainer>
    </>
  );
};

export default StoryInfo;

const StoryHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Profile = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StoryContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const StoryImageWrapper = styled.div`
  height: 300px;
`;

const StoryImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  padding: 15px 0;
`;
