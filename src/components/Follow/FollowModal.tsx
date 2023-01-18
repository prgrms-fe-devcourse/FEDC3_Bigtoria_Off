import styled from '@emotion/styled';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
import { Avatar, Chip, Dialog, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';

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
  const { job, year } = userInfo.username && JSON.parse(userInfo.username);

  return (
    <Dialog sx={{ borderRadius: '1rem' }} open={open} onClose={onClick}>
      <Container>
        <ImageContainer>
          <CoverImageWrapper>
            <CoverImage src={userInfo.coverImage || undefined} />
          </CoverImageWrapper>
          <ProfileImageWrapper>
            <Avatar
              src={userInfo.image}
              alt='profile image'
              sx={{ width: '80px', height: '80px' }}
            />
          </ProfileImageWrapper>
        </ImageContainer>
        <TextContainer>
          <div>{userInfo.fullName}</div>
        </TextContainer>
        <Stack
          direction='row'
          spacing={1}
          justifyContent='center'
          sx={{ margin: '1rem 0 1rem 0' }}>
          <Chip
            icon={<WorkHistoryTwoToneIcon />}
            label={job}
            variant='outlined'
          />
          <Chip icon={<CakeTwoToneIcon />} label={year} variant='outlined' />
        </Stack>
        <Stack
          direction='row'
          spacing={1}
          justifyContent='center'
          sx={{ margin: '1rem 0 1rem 0', width: '100%' }}>
          <Button variant='outlined' startIcon={<AutoStoriesTwoToneIcon />}>
            스토리북
          </Button>
          <Button variant='contained' endIcon={<SendTwoToneIcon />}>
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
  width: 250px;
  height: 100%;
  border: 2px solid #000;
  box-shadow: 24;
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 60px;
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
  margin-left: -40px;
  bottom: -40px;
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
