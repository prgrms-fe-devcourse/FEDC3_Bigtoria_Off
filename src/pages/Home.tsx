import { useEffect, useState } from 'react';
import SearchForm from '../components/Home/SearchForm/SearchForm';
import UserList from '../components/Home/UserList/UserList';
import { dummy, User } from '../components/Home/dummy';

const HomePage = () => {
  const [userProfiles, setUserProfiles] = useState(dummy);

  useEffect(() => {
    //api 및 전체 사용자 프로필 목록 초기
  });

  const handleSubmit = (users: Array<User>) => {
    setUserProfiles(users);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      <UserList users={userProfiles} />
    </div>
  );
};

export default HomePage;
