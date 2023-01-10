import { useEffect, useState } from 'react';
import SearchForm from '../components/Home/SearchForm/SearchForm';
import UserList from '../components/Home/UserList/UserList';

//TODO: api작업 후, dummy 삭제
import { User } from '../components/Home/dummy';

/*
 * 기능
 * 1. api 및 전체 사용자 프로필 목록 초기화
 * 2. 검색 결과에 대한 api요청
 *  - fullName을 기준으로 검색됨.
 *  - username 검색 범위에 포함할 것인가?
 */

//TODO: API_END_POINT - env파일
const API_END_POINT = '';

const HomePage = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    //TODO: api폴더로 이동
    const url = `${API_END_POINT}/users/get-users`;
    const config = {
      method: 'GET',
    };

    const fetchUserList = async () => {
      await fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          setUserProfiles(data);
        });
    };

    fetchUserList();
  }, []);

  const handleSubmit = (keyword: string) => {
    //TODO: api폴더로 이동
    const url = `${API_END_POINT}/search/users/${keyword}`;
    const config = {
      method: 'GET',
    };

    const fetchFilteredUserList = async () => {
      await fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          const filteredUser = data.filter((u: User) => {
            const { fullName } = u;

            if (fullName.toLowerCase().match(keyword.toLowerCase()))
              return true;
            return false;
          });

          setUserProfiles(filteredUser);
        });
    };

    fetchFilteredUserList();
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      <UserList users={userProfiles} />
    </div>
  );
};

export default HomePage;
