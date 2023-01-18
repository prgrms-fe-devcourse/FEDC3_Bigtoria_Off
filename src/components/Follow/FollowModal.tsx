import styled from '@emotion/styled';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
import { Avatar, Chip, Dialog, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

interface Props {
  open: boolean;
  userInfo: {
    image?: string;
    user: string;
    fullName?: string;
    username?: string;
    coverImage?: string;
    isOnline?: boolean;
  };
  onClick: () => void;
}

const FollowModal = ({ open, userInfo, onClick }: Props) => {
  const navigate = useNavigate();
  const { job, year } = userInfo.username && JSON.parse(userInfo.username);

  const handleClickStoryBook = () => {
    navigate(ROUTES.STORY_BOOK_BY_USER_ID(userInfo.user));
  };

  return (
    <Dialog sx={{ borderRadius: '1rem' }} open={open} onClose={onClick}>
      <Container>
        <ImageContainer>
          <CoverImageWrapper>
            <IconButton
              aria-label='delete'
              size='large'
              sx={{ position: 'absolute' }}
              onClick={onClick}>
              <CancelOutlinedIcon fontSize='inherit' />
            </IconButton>
            <CoverImage src={userInfo.coverImage || undefined} />
          </CoverImageWrapper>
          <ProfileImageWrapper>
            <Avatar
              src={userInfo.image}
              alt='profile image'
              sx={{ width: '100px', height: '100px' }}
            />
          </ProfileImageWrapper>
        </ImageContainer>
        <TextContainer>
          <div>{userInfo.fullName}</div>
        </TextContainer>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='center'
          sx={{ margin: '1rem 0 1rem 0', height: '80px' }}>
          <Chip
            icon={<WorkHistoryTwoToneIcon />}
            color='success'
            label={job}
            variant='outlined'
          />
          <Chip
            icon={<CakeTwoToneIcon />}
            color='secondary'
            label={year}
            variant='outlined'
          />
        </Stack>
        <Divider />
        <Stack
          direction='row'
          spacing={0}
          justifyContent='center'
          sx={{ width: '100%' }}>
          <Button
            variant='outlined'
            startIcon={<AutoStoriesTwoToneIcon />}
            color='warning'
            size='large'
            onClick={handleClickStoryBook}
            sx={{
              width: '50%',
            }}>
            스토리북
          </Button>
          <Button
            variant='contained'
            endIcon={<SendTwoToneIcon />}
            color='warning'
            sx={{ width: '50%' }}>
            채팅
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default FollowModal;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 2px solid orange;
  box-shadow: 24;
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 50px;
`;

const CoverImageWrapper = styled.div`
  position: relative;
`;

const CoverImage = styled.img<{ src: string | undefined }>`
  width: 100%;
  height: 200px;
  background: ${(props) => (props.src ? `url(${props.src})` : 'lightgray')};
  object-fit: cover;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -50px;
  bottom: -50px;
  left: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
