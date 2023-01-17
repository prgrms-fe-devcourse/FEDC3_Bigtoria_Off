import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

import useLike from '../../hooks/useLike';
import { Like } from '../../interfaces/like';
import { User } from '../../interfaces/user';

interface Props {
  user?: User;
  likes: Like[];
  storyId: string;
}

const LikeButton = ({ user, likes, storyId }: Props) => {
  const { isLike, likeCount, handleClick } = useLike(
    user?._id || '',
    likes,
    storyId
  );

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
