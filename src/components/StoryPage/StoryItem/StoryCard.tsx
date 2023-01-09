import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import useLazyLoadImage from '../../../hooks/useLazyLoadImage';

interface Props {
  title: string;
  id: string;
  lazy?: boolean;
}

const StoryCard = ({ title, id, lazy = false }: Props) => {
  const { loaded, imageRef } = useLazyLoadImage(lazy);
  const navigate = useNavigate();

  const handleClick = () => {
    // todo: StoryCard 클릭 시 해당 story detail 페이지로 이동.
    // navigate(`/story/${id}`);
  };

  return (
    <Card
      sx={{ maxWidth: 210, marginRight: '16px', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        ref={imageRef}
        sx={{ height: 280 }}
        image={
          loaded
            ? 'https://picsum.photos/200'
            : 'https://via.placeholder.com/200'
        }
        title="StoryCard component sample"
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
