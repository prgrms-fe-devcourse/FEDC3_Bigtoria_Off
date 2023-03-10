import { useEffect, useState } from 'react';

import { checkAuth } from '../apis/auth';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { User } from '../interfaces/user';

const useFetchUser = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await checkAuth();
        setUser(user);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_USER);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};

export default useFetchUser;
