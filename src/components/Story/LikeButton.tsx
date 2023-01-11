import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

interface Props {
  likeCount: number;
}

const LikeButton = ({ likeCount = 0 }: Props) => {
  return (
    <IconButton>
      <FavoriteIcon sx={{ marginRight: '3px', marginBottom: '3px' }} />
      {likeCount}
    </IconButton>
  );
};

export default LikeButton;
