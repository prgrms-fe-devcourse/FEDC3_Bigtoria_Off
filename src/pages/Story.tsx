import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CommentForm from '../components/Story/CommentForm';
import CommentList from '../components/Story/CommentList';
import LikeButton from '../components/Story/LikeButton';
import useFetchStory from '../hooks/useFetchStory';

const Story = () => {
  const { story, isLoading } = useFetchStory();
  const navigate = useNavigate();

  if (isLoading || !story.title) return <CircularProgress />;

  const { realTitle, year, month, day, content } = JSON.parse(story.title);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant='h3'
            gutterBottom
            sx={{ fontSize: '2rem', fontWeight: '500' }}
          >
            {realTitle}
          </Typography>
          {/* TODO: 작성자만 수정 삭제 버튼 보이도록 처리 */}
          <Box>
            <Button
              variant='text'
              onClick={() => navigate(`/story/edit/${story._id}`)}
            >
              수정
            </Button>
            {/* TODO: 삭제 API 연동 */}
            <Button variant='text'>삭제</Button>
          </Box>
        </Box>
        <Typography variant='subtitle1' gutterBottom>
          {year}.{month}.{day}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/story-book/${story.author._id}`)}
        >
          <Avatar src={story.author.image} alt='profile image'></Avatar>
          <p>{story.author.fullName}</p>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        {story.image && <StoryImage src={story.image} alt='story image' />}
        {content && (
          <Paper variant='outlined' sx={{ padding: '30px', margin: '20px 0' }}>
            {content}
          </Paper>
        )}
        <LikeButton likeCount={story.likes.length} />
      </Box>
      <Divider />
      <Box>
        <CommentList comments={story.comments} />
        <CommentForm />
      </Box>
    </Box>
  );
};

export default Story;

const StoryImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  padding: 15px 0;
`;
