import styled from '@emotion/styled';
import { Avatar, Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

interface Props {
  open: boolean;
  userInfo: {
    image?: string;
    user?: string;
    fullName?: string;
    username?: string;
    coverImage?: string;
    isOnline?: boolean;
  };
  onClick: () => void;
}

const FollowModal = ({ open, userInfo, onClick }: Props) => {
  return (
    <Dialog sx={style} open={open} onClose={onClick}>
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
      </Container>
    </Dialog>
  );
};

export default FollowModal;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
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
  bottom: -40px;
  left: 50%;
  margin-left: -40px;
`;
