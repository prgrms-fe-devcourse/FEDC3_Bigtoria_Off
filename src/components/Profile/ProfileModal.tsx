import styled from '@emotion/styled';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';

import { ModalType } from '../../pages/Profile';
import PasswordForm from './PasswordForm';
import TextForm from './TextForm';

interface Props {
  type: ModalType;
  user: {
    fullName?: string;
    username?: string;
    image?: string;
    coverImage?: string;
  };
  open: boolean;
  handleOpen: () => void;
}

interface ModalInfo {
  title: string;
  form: ReactNode;
}

const ProfileModal = ({ type, user, open, handleOpen }: Props) => {
  const modal: { [key: string]: ModalInfo } = {
    password: {
      title: '비밀번호',
      form: <PasswordForm open={open} handleOpen={handleOpen}></PasswordForm>,
    },
    nickname: {
      title: '닉네임',
      form: (
        <TextForm
          type='닉네임'
          fullName={user.fullName || ''}
          username={user.username || ''}
          open={open}
          handleOpen={handleOpen}></TextForm>
      ),
    },
    job: {
      title: '직업',
      form: (
        <TextForm
          type='직업'
          fullName={user.fullName || ''}
          username={user.username || ''}
          open={open}
          handleOpen={handleOpen}></TextForm>
      ),
    },
    coverImage: {
      title: '커버 이미지',
      form: <div></div>,
    },
    profileImage: {
      title: '프로필 이미지',
      form: <div></div>,
    },
  };

  return (
    <Modal open={open} onClose={handleOpen}>
      <ContentWrapper>
        <Typography variant='h6' component='h2'>
          {modal[type].title}
        </Typography>
        {modal[type].form}
      </ContentWrapper>
    </Modal>
  );
};

export default ProfileModal;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 50%;
  min-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 5px 5px grey;
`;
