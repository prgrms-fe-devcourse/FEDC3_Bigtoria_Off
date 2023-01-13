import { useEffect, useState } from 'react';

import { checkAuth } from '../apis/auth';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const useFetchUser = () => {
  const [user, setUser] = useState({
    _id: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkAuth();
        setUser(user);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_USER);
      }
    };

    fetchUser();
  }, []);

  return { user };
};

export default useFetchUser;
