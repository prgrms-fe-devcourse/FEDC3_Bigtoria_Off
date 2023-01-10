import { useEffect, useState } from 'react';

import { getUserList, searchUserList } from '../apis/search';
import SearchForm from '../components/Home/SearchForm/SearchForm';
import UserList from '../components/Home/UserList/UserList';

/*
 * 기능
 * 1. api 및 전체 사용자 프로필 목록 초기화
 * 2. 검색 결과에 대한 api요청
 *  - fullName을 기준으로 검색됨.
 *  - username 검색 범위에 포함할 것인가?
 */

const HomePage = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const initUserList = async () => {
      const userList = await getUserList();

      setUserProfiles(userList);
    };

    initUserList();
  }, []);

  const handleSubmit = async (keyword: string) => {
    const filteredUser = await searchUserList(keyword);

    setUserProfiles(filteredUser);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      <UserList users={userProfiles} />
    </div>
  );
};

export default HomePage;
