import { Box, List } from '@mui/material';

import { ROUTES } from '../../constants/routes';
import { User } from '../../interfaces/user';
import NoResultBox from './NoResultBox';
import UserProfile from './UserProfile';

interface Props {
  users: User[] | null;
}

const { STORY_BOOK_BY_USER_ID } = ROUTES;

const UserList = ({ users }: Props) => {
  return (
    <>
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
                path={STORY_BOOK_BY_USER_ID(_id)}
                image={image}
                fullName={fullName}
                job={job}
                year={year}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

export default UserList;
