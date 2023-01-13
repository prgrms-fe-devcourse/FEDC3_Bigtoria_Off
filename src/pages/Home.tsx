import { Box, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { useEffect } from 'react';

import FontText from '../components/Home/FontText';
import SearchForm from '../components/Home/SearchForm';
import UserList from '../components/Home/UserList';
import useFetchUserList from '../hooks/useFetchUserList';

const HomePage = () => {
  const { isLoading, userProfiles, initUserProfiles, searchUserProfiles } =
    useFetchUserList();

  useEffect(() => {
    initUserProfiles();
  }, []);

  const handleSubmit = async (keyword: string) => {
    searchUserProfiles(keyword);
  };

  return (
    <Box
      sx={{
        minWidth: '320px',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box component='header'>
        <FontText
          component='h1'
          title='Bigtoria.'
          sx={{
            display: 'inline-block',
            marginBottom: '30px',
            fontSize: '5rem',
          }}
        />
      </Box>
      <Box
        component='main'
        sx={{
          width: '92%',
          display: 'block',
          margin: '0 auto',
        }}>
        <SearchForm onSubmit={handleSubmit} />
        <FontText
          component='p'
          title='profiles..'
          sx={{
            display: 'inline-block',
            fontSize: '28px',
            paddingLeft: '5px',
            marginTop: '20px',
          }}
        />
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '30px',
              padding: '40px',
            }}>
            <CircularProgress
              size={48}
              sx={{
                color: lightBlue[500],
                position: 'absolute',
              }}
            />
          </Box>
        ) : (
          userProfiles && <UserList users={userProfiles} />
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
