import { Box, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';

import { getUserList } from '../apis/search';
import FontText from '../components/Home/FontText';
import SearchForm from '../components/Home/SearchForm';
import UserList from '../components/Home/UserList';
import { DATA_LIMIT } from '../constants/apiParams';
import useFetchUserList from '../hooks/useFetchUserList';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Home = () => {
  const {
    userProfiles,
    setUserProfiles,
    initUserProfiles,
    searchUserProfiles,
  } = useFetchUserList();

  const [isLoaded, setIsLoaded] = useState(false);
  const dataOffset = useRef(0);
  const [isAllRendered, setIsAllRendered] = useState(false);

  const handleSubmit = async (keyword: string) => {
    searchUserProfiles(keyword);
  };

  const getMoreItem = async () => {
    setIsLoaded(true);

    const result = await getUserList(dataOffset.current * DATA_LIMIT);
    dataOffset.current++;

    if (result.length === 0) setIsAllRendered(true);

    setUserProfiles([...(userProfiles || []), ...result]);

    setIsLoaded(false);
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoaded) {
        await getMoreItem();
      }
    },
  });

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
        <Box>{userProfiles && <UserList users={userProfiles} />}</Box>
      </Box>
      {!isAllRendered && (
        <Box
          ref={setTarget}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '30px',
            padding: '40px',
          }}>
          {isLoaded && (
            <CircularProgress
              size={48}
              sx={{
                color: lightBlue[500],
                position: 'absolute',
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
