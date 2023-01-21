import { Button, ButtonProps, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../../apis/follow';
import { postNotification } from '../../apis/notification';
import { userInfo } from '../../apis/userInfo';
import { USER_ID_KEY } from '../../constants/auth';
import { COLORS } from '../../constants/colors';
import useDisplayModeContext from '../../contexts/DisplayModeContext';
import { Follow as Following } from '../../interfaces/user';
import { getLocalStorage } from '../../utils/storage';

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [canBeRendered, setCanBeRendered] = useState(false);
  const [followId, setFollowId] = useState('');
  const { userId } = useParams();
  const { displayMode } = useDisplayModeContext();
  const isDarkAndIsFollowing = displayMode === 'dark' && isFollowing;

  const storedUserId = getLocalStorage(USER_ID_KEY);
  const isMyStoryBook = userId === storedUserId;

  const handleClick = async () => {
    if (!userId) return;

    const result = isFollowing
      ? await removeFollow(followId)
      : await createFollow(userId);

    if (result) {
      const {
        data: { _id: newFollowId, user: userId },
      }: { data: { _id: string; user: string } } = result;
      setFollowId(newFollowId);

      //follow notification 보내기
      !isFollowing &&
        (await postNotification('FOLLOW', newFollowId, userId, null));
    }

    isFollowing ? setIsFollowing(false) : setIsFollowing(true);
  };

  useEffect(() => {
    const initializeStatusAboutFollow = async () => {
      const { following: followings }: { following: Following[] } =
        await userInfo(storedUserId);
      const followingDiscovered = followings.find(
        (following) => following.user === userId
      );

      if (followingDiscovered) {
        setFollowId(followingDiscovered._id);
        setIsFollowing(true);
      }

      setCanBeRendered(true);
    };

    userId && storedUserId && initializeStatusAboutFollow();
  }, []);

  return (
    <span>
      {!isMyStoryBook && canBeRendered && (
        <CustomButton
          sx={{
            borderColor: isDarkAndIsFollowing ? COLORS.MUI_LABEL : null,
            color: isDarkAndIsFollowing ? COLORS.MUI_LABEL : null,
          }}
          variant='outlined'
          color='warning'
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
