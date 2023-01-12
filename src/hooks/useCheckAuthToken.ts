import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../constants/auth';
import { ROUTES } from '../constants/routes';
import { getStorage } from './../utils/storage';

const useCheckAuthToken = () => {
  const token = getStorage(TOKEN_KEY);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate(ROUTES.HOME);
  }, []);
};

export default useCheckAuthToken;
