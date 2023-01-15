import { Box, List } from '@mui/material';

import { User } from '../../interfaces/user';
import NoResultBox from './NoResultBox';
import UserProfile from './UserProfile';

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
                path={`/story-book/${_id}`}
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
