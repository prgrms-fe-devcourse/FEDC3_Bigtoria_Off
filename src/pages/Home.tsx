import { Box, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import FontText from '../components/Home/FontText';
import SearchForm from '../components/Home/SearchForm';
import UserList from '../components/Home/UserList';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Home = () => {
  const {
    setTarget,
    data,
    isLoaded,
    isAllRendered,
    initAllStateAndGetDataWithAPI,
    searchDataWithState,
  } = useInfiniteScroll();

  const handleSubmit = async (keyword: string) => {
    keyword === ''
      ? await initAllStateAndGetDataWithAPI()
      : await searchDataWithState(keyword);
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
        userSelect: 'none',
      }}>
      <Box component='header'>
        <FontText
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
        <Box sx={{ userSelect: 'none' }}>
          <FontText
            title='profiles..'
            sx={{
              display: 'inline-block',
              fontSize: '28px',
              paddingLeft: '5px',
              marginTop: '20px',
            }}
          />
        </Box>
        <Box>{data && <UserList users={data} />}</Box>
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
