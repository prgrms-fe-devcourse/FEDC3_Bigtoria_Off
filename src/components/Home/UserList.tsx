import { Box, List } from '@mui/material';

import { User } from '../../interfaces/user';
import NoResultBox from './NoResultBox';
import UserProfile from './UserProfile';
/*
 * TODO
 * 1. 클릭시 유저 프로필 페이지로 넘어가기
 */

interface Props {
  users: User[] | null;
}

const UserList = ({ users }: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '10px',
        padding: 0,
      }}>
      {!users || users.length === 0 ? (
        <NoResultBox />
      ) : (
        <List
          sx={{
            width: '100%',
          }}>
          {users.map(({ _id, image, fullName, username }) => {
            const job = username ? JSON.parse(username).job : '';
            const year = username ? JSON.parse(username).year : '';

            return (
              <UserProfile
                key={_id}
                path={`/story-book/63bcf0d4f596c65f9ee2f226`}
                image={image}
                fullName={fullName}
                job={job}
                year={year}
              />
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default UserList;
