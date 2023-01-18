import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

import { COLORS } from '../../constants/colors';
import useLike from '../../hooks/useLike';
import { Like } from '../../interfaces/like';
import { User } from '../../interfaces/user';

interface Props {
  user?: User;
  authorId: string;
  likes: Like[];
  storyId: string;
}

const LikeButton = ({ user, authorId, likes, storyId }: Props) => {
  const { isLike, likeCount, handleClick } = useLike(
    user?._id || '',
    authorId,
    likes,
    storyId
  );

  return (
    <IconButton onClick={handleClick}>
      {isLike ? (
        <FavoriteIcon
          sx={{ marginRight: '3px', marginBottom: '3px', color: COLORS.SUB }}
        />
      ) : (
        <FavoriteBorderIcon sx={{ marginRight: '3px', marginBottom: '3px' }} />
      )}
      <Count isLike={isLike}>{likeCount}</Count>
    </IconButton>
  );
};

export default LikeButton;

const Count = styled.span<{ isLike: boolean }>`
  color: ${({ isLike }) => isLike && COLORS.SUB};
`;
