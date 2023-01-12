import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { getUserList, searchUserList } from '../apis/search';
import SearchForm from '../components/Home/SearchForm';
import Title from '../components/Home/Title';
import UserList from '../components/Home/UserList';

const Home = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const initUserList = async () => {
      const userList = await getUserList();

      setUserProfiles(userList);
    };

    initUserList();
  }, []);

  const handleSubmit = async (keyword: string) => {
    const filteredUser = await searchUserList(keyword);

    setUserProfiles(filteredUser);
  };

  return (
    <Box>
      <Box
        component='header'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 20px 30px 20px',
        }}
      >
        <Title title='Bigtoria' />
      </Box>
      <Box
        component='main'
        sx={{
          width: 400,
          margin: '0 auto',
        }}
      >
        <SearchForm onSubmit={handleSubmit} />
        <UserList users={userProfiles} />
      </Box>
    </Box>
  );
};

export default Home;
