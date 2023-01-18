import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileModal from '../components/Profile/ProfileModal';
import Loading from '../components/StoryBook/Loading';
import { TOKEN_KEY } from '../constants/auth';
import { ROUTES } from '../constants/routes';
import useFetchUser from '../hooks/useFetchUser';
import { getLocalStorage } from '../utils/storage';

const modalType = ['password', 'nickname', 'job', 'coverImage', 'profileImage'];
export type ModalType = typeof modalType[number];
const isModalType = (x: string): x is ModalType => modalType.includes(x);

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('');
  const { user, isLoading } = useFetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorage(TOKEN_KEY);
    if (!token) {
      alert('로그인 후 이용해 주세요.');
      navigate(ROUTES.SIGNIN);
      return;
    }
  });

  if (isLoading) return <Loading />;

  const handleModalType = (e: MouseEvent) => {
    if (
      !(
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLDivElement
      )
    )
      return;

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

  if (isLoading || !user?._id) return <Loading />;

  const { image, coverImage, fullName, username, email } = user;

  let job, year, month, day;
  if (username) {
    const infoObj = JSON.parse(username);
    job = infoObj?.job || '';
    year = infoObj?.year || '';
    month = infoObj?.month || '';
    day = infoObj?.day || '';
  }

  return (
    <Container>
      <ImageContainer>
        <CoverImageWrapper>
          <CoverImage
            image={coverImage || ''}
            data-type='coverImage'
            onClick={handleModalType}
          />
          <Button
            data-type='coverImage'
            onClick={handleModalType}
            sx={{
              position: 'absolute',
              bottom: '5px',
              left: '83%',
              color: 'gray',
            }}>
            변경
          </Button>
        </CoverImageWrapper>
        <ProfileImageWrapper>
          <Avatar
            src={image}
            alt='profile image'
            sx={{ width: '80px', height: '80px' }}></Avatar>
          <Button data-type='profileImage' onClick={handleModalType}>
            변경
          </Button>
        </ProfileImageWrapper>
      </ImageContainer>
      <Box>
        <List
          component='nav'
          subheader={<ListSubheader>계정 정보</ListSubheader>}>
          {email && (
            <ListItem sx={{ alignItems: 'baseline' }}>
              <ListItemText primary='이메일 주소' />
              <span>{email}</span>
            </ListItem>
          )}
          {fullName && (
            <InfoListItem sx={{ alignItems: 'baseline', paddingRight: 0 }}>
              <ListItemText primary='닉네임' />
              <span>{fullName}</span>
              <Button data-type='nickname' onClick={handleModalType}>
                변경
              </Button>
            </InfoListItem>
          )}
          {job && (
            <InfoListItem>
              <ListItemText primary='직업' />
              <span>{job}</span>
              <Button data-type='job' onClick={handleModalType}>
                변경
              </Button>
            </InfoListItem>
          )}
          {year && (
            <ListItem sx={{ alignItems: 'baseline' }}>
              <ListItemText primary='생년월일' />
              <span>
                {year}년 {month}월 {day}일
              </span>
            </ListItem>
          )}
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
      </Box>
      {modalType && (
        <ProfileModal
          type={modalType}
          user={{
            fullName,
            username,
            image,
            coverImage,
          }}
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
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 60px;
`;

const CoverImageWrapper = styled.div`
  position: relative;
`;

const CoverImage = styled.div<{ image: string }>`
  width: 100%;
  height: 200px;
  background: ${(props) => (props.image ? `url(${props.image})` : 'lightgray')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: -70px;
  left: 50%;
  margin-left: -40px;
`;

const InfoListItem = styled(ListItem)`
  align-items: baseline;
  padding-right: 0;
`;
