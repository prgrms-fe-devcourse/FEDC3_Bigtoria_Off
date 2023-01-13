import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

import useLike from '../../hooks/useLike';
import { Like } from '../../interfaces/like';

interface Props {
  userId: string;
  likes: Like[];
  storyId: string;
}

const LikeButton = ({ userId, likes, storyId }: Props) => {
  const { isLike, likeCount, handleClick } = useLike(userId, likes, storyId);

  return (
    <IconButton onClick={handleClick}>
      {isLike ? (
        <FavoriteIcon sx={{ marginRight: '3px', marginBottom: '3px' }} />
      ) : (
        <FavoriteBorderIcon sx={{ marginRight: '3px', marginBottom: '3px' }} />
      )}
      {likeCount}
    </IconButton>
  );
};

export default LikeButton;
