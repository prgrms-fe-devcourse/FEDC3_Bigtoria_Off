import { User } from '../dummy';
/*
 * TODO
 * 1. 클릭시 유저 프로필 페이지로 넘어가기
 * 2. component styling
 *   - ul container
 *   - li container
 *   - a
 *   - img
 *   - text (name, info)
 * 3. context API
 */

interface Props {
  users: Array<User>;
}

const UserList = ({ users }: Props) => {
  const showUserProfileList = (userProfiles: Array<User>) => {
    return (
      <ul>
        {userProfiles.map(({ _id, image, fullName }) => {
          const {
            name,
            info: { year, job, description },
          } = JSON.parse(fullName);

          return (
            <li key={_id}>
              <a href='#'>
                <img src={image} />
                <p>{name}</p>
                <p>
                  {year} {job} {description}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return <>{showUserProfileList(users)}</>;
};

export default UserList;
