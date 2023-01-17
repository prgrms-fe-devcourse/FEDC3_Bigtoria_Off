import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

import ProfileModal from '../components/Profile/ProfileModal';
import Loading from '../components/StoryBook/Loading';
import useFetchUser from '../hooks/useFetchUser';

const modalType = ['password', 'nickname', 'job', 'coverImage', 'profileImage'];
export type ModalType = typeof modalType[number];
const isModalType = (x: string): x is ModalType => modalType.includes(x);

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('');
  const { user, isLoading } = useFetchUser();

  const handleModalType = (e: MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const { type } = e.target.dataset;
    if (!type) return;

    if (isModalType(type)) {
      setModalType(type);
      setModalOpen(!modalOpen);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  if (isLoading || !user) return <Loading />;

  const { image, fullName, username } = user;
  const job = (username && JSON.parse(username).job) || '';
  const date = (username && JSON.parse(username).date) || '';

  return (
    <Container>
      <Section>
        <Avatar
          src={image}
          alt='profile image'
          sx={{ width: '80px', height: '80px' }}></Avatar>
        <Button data-type='profileImage' onClick={handleModalType}>
          수정
        </Button>
      </Section>
      <Box>
        <List
          component='nav'
          subheader={<ListSubheader>계정 정보</ListSubheader>}>
          <ListItem>
            <ListItemText primary='닉네임' />
            <span>{fullName}</span>
            <Button data-type='nickname' onClick={handleModalType}>
              수정
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary='직업' />
            <span>{job}</span>
            <Button data-type='job' onClick={handleModalType}>
              수정
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary='생년월일' />
            {date && (
              <span>
                {date.year}년 {date.month}월 {date.day}일
              </span>
            )}
          </ListItem>
          <ListItem sx={{ paddingLeft: '8px' }}>
            <Button
              data-type='password'
              onClick={handleModalType}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}>
              비밀번호 변경
            </Button>
          </ListItem>
        </List>
        <Divider />
        <List component='nav' subheader={<ListSubheader>활동</ListSubheader>}>
          <ListItem>
            <ListItemButton>
              <ListItemText primary='좋아요 표시한 스토리' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary='댓글 단 스토리' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      {modalType && (
        <ProfileModal
          type={modalType}
          open={modalOpen}
          handleOpen={handleModalOpen}></ProfileModal>
      )}
    </Container>
  );
};

export default Profile;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
