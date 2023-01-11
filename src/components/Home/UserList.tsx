import { Box, List } from '@mui/material';

import { User } from '../../interfaces/user';
import NoResultBox from './NoResultBox';
import UserProfile from './UserProfile';
/*
 * TODO
 * 1. 클릭시 유저 프로필 페이지로 넘어가기
 */

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const showUserProfileList = (userProfiles: User[]) => {
    return (
      <List
        sx={{
          width: '100%',
        }}
      >
        {userProfiles.map(({ _id, image, fullName, username }) => {
          const job = username ? JSON.parse(username).job : '';
          const year = username ? JSON.parse(username).year : '';

          return (
            <UserProfile
              key={_id}
              path='#'
              image={image}
              fullName={fullName}
              job={job}
              year={year}
            />
          );
        })}
      </List>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '30px',
      }}
    >
      {!users || users.length === 0 ? (
        <NoResultBox />
      ) : (
        showUserProfileList(users)
      )}
    </Box>
  );
};

export default UserList;
