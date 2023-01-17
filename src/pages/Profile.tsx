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
} from '@mui/material';

import PasswordModal from '../components/Profile/PasswordModal';
import Loading from '../components/StoryBook/Loading';
import useFetchUser from '../hooks/useFetchUser';
import useProfile from '../hooks/useProfile';

const Profile = () => {
  const { user, isLoading } = useFetchUser();
  const { modalOpen, handleModalOpen } = useProfile();

  if (isLoading || !user) return <Loading />;

  const { image, fullName, username } = user;
  const job = (username && JSON.parse(username).job) || '';
  const year = (username && JSON.parse(username).year) || '';

  return (
    <Container>
      <Section>
        <Avatar
          src={image}
          alt='profile image'
          sx={{ width: '80px', height: '80px' }}></Avatar>
        <Button>수정</Button>
      </Section>
      <Box>
        <nav>
          <List>
            <ListItem>
              <ListItemText primary='닉네임' />
              <span>{fullName}</span>
              <Button>수정</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='생년월일' />
              <span>{year}</span>
              <Button>수정</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='직업' />
              <span>{job}</span>
              <Button>수정</Button>
            </ListItem>
            <ListItem disableGutters onClick={handleModalOpen}>
              <ListItemButton>
                <ListItemText primary='비밀번호 변경' />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>

        <Divider />
        <nav>
          <List>
            <ListItem disableGutters>
              <ListItemButton>
                <ListItemText primary='좋아요 표시한 스토리' />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton>
                <ListItemText primary='댓글 단 스토리' />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <PasswordModal open={modalOpen} handleOpen={handleModalOpen} />
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
