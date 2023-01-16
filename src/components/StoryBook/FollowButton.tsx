import { Button, ButtonProps, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../../apis/follow';
import { userInfo } from '../../apis/userInfo';
import { USER_ID_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { Follow as Following } from '../../interfaces/user';
import { getLocalStorage } from '../../utils/storage';

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [canBeRendered, setCanBeRendered] = useState(false);
  const [followId, setFollowId] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const storedUserId = getLocalStorage(USER_ID_KEY);
  const isMyStoryBook = userId === storedUserId;

  const handleClick = async () => {
    if (isFollowing && userId && followId) {
      const result = await removeFollow(followId);
      result && setIsFollowing(false);
      return;
    }

    if (userId) {
      const result = await createFollow(userId);
      if (result) {
        const {
          data: { _id: newFollowId },
        }: { data: { _id: string } } = result;
        newFollowId && setFollowId(newFollowId);
        newFollowId && setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (userId && storedUserId) {
        const { following: followings }: { following: Following[] } =
          await userInfo(storedUserId);
        const following = followings.find((f) => f.user === userId);
        if (following) {
          setFollowId(following._id);
          setIsFollowing(true);
        }
      }

      if (!storedUserId) {
        navigate(ROUTES.HOME);
      }

      setCanBeRendered(true);
    })();
  }, []);

  return (
    <span>
      {!isMyStoryBook && canBeRendered && (
        <CustomButton
          variant='outlined'
          onClick={handleClick}
          isFollowing={isFollowing}>
          {isFollowing ? '팔로잉' : '팔로우'}
        </CustomButton>
      )}
    </span>
  );
};

export default FollowButton;

interface StyledButtonProps extends ButtonProps {
  isFollowing?: boolean;
}

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isFollowing',
})<StyledButtonProps>(({ isFollowing }) => ({
  ...(isFollowing && {
    color: 'rgba(0, 0, 0, 0.26)',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  }),
}));
