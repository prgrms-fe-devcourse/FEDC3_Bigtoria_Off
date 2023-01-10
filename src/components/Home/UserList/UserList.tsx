import styled from '@emotion/styled';

import { User } from '../dummy';
/*
 * TODO
 * 1. 클릭시 유저 프로필 페이지로 넘어가기
 * 2. component styling with MUI
 *   - ul container
 *   - li container
 *   - a
 *   - img
 *   - text (name, info)
 */

type UserList = Array<User>;

interface Props {
  users: UserList;
}

const UserList = ({ users }: Props) => {
  const showUserProfileList = (userProfiles: UserList) => {
    return (
      <ul>
        {userProfiles.map(({ _id, image, fullName, username }) => {
          let description = null;

          if (username) {
            description = JSON.parse(username);
          }

          return (
            <li key={_id}>
              <a href='#'>
                <img src={image} />
                <p>{fullName}</p>
                {description && (
                  <p>
                    {description.year} {description.job}
                  </p>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {!users || users.length === 0 ? (
        <NoResultContainer>0 Results...</NoResultContainer>
      ) : (
        showUserProfileList(users)
      )}
    </div>
  );
};

export default UserList;

const NoResultContainer = styled.div`
  font-size: 25px;
`;
