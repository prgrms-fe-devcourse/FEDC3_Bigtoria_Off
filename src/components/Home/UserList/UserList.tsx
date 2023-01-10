import { useState } from 'react';
import { dummy } from '../dummy';

interface Props {
  users: Array<User>;
}

//TODO: props로 userList를 받을 예정
const UserList = () => {
  const [userProfiles, setUserProfiles] = useState(dummy);

  const showUserProfileList = (userProfiles: Array<User>) => {
    return (
      <ul>
        {userProfiles.map(({ _id, fullName }) => {
          const {
            name,
            image,
            info: { year, job, description },
          } = JSON.parse(fullName);
          return (
            <li key={_id}>
              <img src={image} />
              <p>{name}</p>
              <p>
                {year} {job} {description}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  return <>{showUserProfileList(userProfiles)}</>;
};

export default UserList;
