import styled from '@emotion/styled';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import defaultImage from '../../assets/images/defaultImage.png';
import { COLORS } from '../../constants/colors';
import useLazyLoadImage from '../../hooks/useLazyLoadImage';
import { Story } from '../../interfaces/story';

interface Props {
  story: Story;
  title: string;
  storyId: string;
  image?: string;
  lazy?: boolean;
}

const StoryCard = ({ story, title, storyId, image, lazy = false }: Props) => {
  const { loaded, imageRef } = useLazyLoadImage(lazy);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story/${storyId}`, { state: story });
  };

  return (
    <CustomCard
      sx={{
        width: '210px',
        marginRight: '16px',
        marginTop: '.3rem',
        cursor: 'pointer',
        boxShadow: `1px 1px 3px 1px ${COLORS.STORY_CARD_BORDER}`,
      }}
      onClick={handleClick}>
      <CardMedia
        component='img'
        ref={imageRef}
        sx={{
          height: 280,
          borderBottom: `1px solid ${COLORS.STORY_CARD_BORDER}`,
        }}
        image={loaded ? (image ? image : defaultImage) : defaultImage}
        title={`${title} 사진`}
      />
      <CardContent>
        <Typography
          sx={{
            textAlign: 'center',
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {title}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

export default StoryCard;

const CustomCard = styled(Card)`
  animation: cardSmoothAppear 0.5s;

  @keyframes cardSmoothAppear {
    from {
      opacity: 0;
      transform: translateY(2.5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
