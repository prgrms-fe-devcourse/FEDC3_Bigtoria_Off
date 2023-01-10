import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import defaultImage from '../../assets/images/defaultImage.png';
import useLazyLoadImage from '../../hooks/useLazyLoadImage';

interface Props {
  title: string;
  storyId: string;
  image?: string;
  lazy?: boolean;
}

const StoryCard = ({ title, storyId, image, lazy = false }: Props) => {
  const { loaded, imageRef } = useLazyLoadImage(lazy);
  const navigate = useNavigate();

  const handleClick = () => {
    // todo: StoryCard 클릭 시 해당 story detail 페이지로 이동.
    navigate(`/story/${storyId}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 210,
        marginRight: '16px',
        cursor: 'pointer',
        boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2)',
      }}
      onClick={handleClick}
    >
      <CardMedia
        component='img'
        ref={imageRef}
        sx={{ height: 280 }}
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
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
