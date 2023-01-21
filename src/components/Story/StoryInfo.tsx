import styled from '@emotion/styled';
import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../../constants/colors';
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
  const { user, isLoading } = useFetchUser();

  const { storyTitle, year, month, day, content } = JSON.parse(story.title);

  return (
    <>
      <Box>
        <h1>{storyTitle}</h1>
        <DateContainer>
          <Typography variant='subtitle1'>
            {year}년 {month}월 {day}일
          </Typography>
          {!isLoading && user?._id === story.author._id && (
            <Box>
              <Button
                variant='text'
                sx={{ color: COLORS.SUB }}
                onClick={() =>
                  navigate(ROUTES.STORY_EDIT_BY_STORY_ID(story._id), {
                    state: story,
                  })
                }>
                수정
              </Button>
              <Button
                variant='text'
                sx={{ color: COLORS.SUB }}
                color='warning'
                onClick={() => handleDelete(story._id, story.author._id)}>
                삭제
              </Button>
            </Box>
          )}
        </DateContainer>
        <Box sx={{ padding: '3px 0' }}>
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
        {content && <StoryContentWrapper>{content}</StoryContentWrapper>}
        {story.image && (
          <StoryImageWrapper>
            <StoryImage src={story.image} alt='story image' />
          </StoryImageWrapper>
        )}
        <LikeButton
          user={user}
          authorId={story.author._id}
          storyId={story._id}
          likes={story.likes}
        />
      </StoryContainer>
    </>
  );
};

export default StoryInfo;

const DateContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  padding: 15px 0;
`;

const StoryImage = styled.img`
  width: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const StoryContentWrapper = styled.div`
  width: 100%;
  margin: 15px 0;
  line-height: 1.5rem;
  word-break: keep-all;
  white-space: pre-wrap;
`;
