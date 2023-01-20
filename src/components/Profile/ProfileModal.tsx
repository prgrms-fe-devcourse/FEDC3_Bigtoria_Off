import styled from '@emotion/styled';
import { createTheme, Dialog, ThemeProvider, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { ModalType } from '../../pages/Profile';
import ImageForm from './ImageForm';
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
      form: (
        <ImageForm
          type='커버'
          oldImage={user.coverImage || ''}
          open={open}
          handleOpen={handleOpen}
        />
      ),
    },
    profileImage: {
      title: '프로필 이미지',
      form: (
        <ImageForm
          type='프로필'
          oldImage={user.image || ''}
          open={open}
          handleOpen={handleOpen}
        />
      ),
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleOpen} disableScrollLock={true}>
        <Container>
          <TitleWrapper>
            <Typography variant='h6' component='h2' sx={{ padding: '5px' }}>
              {modal[type].title} 변경
            </Typography>
          </TitleWrapper>
          <div>{modal[type].form}</div>
        </Container>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
`;

const theme = createTheme({
  typography: {
    fontFamily: "'MaplestoryOTFLight', cursive",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '5%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          border: '0',
          borderTop: '1px solid rgba(237, 108, 2, 0.5)',
        },
      },
    },
  },
});
