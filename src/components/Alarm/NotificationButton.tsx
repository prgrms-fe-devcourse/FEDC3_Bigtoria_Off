import { Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

/*
 * TODO: 알림 확인하는 방법
 *  1. 주기적으로 알림 체크하기?
 *  2. 확인 안한 알림 있으면 뱃지로 표시하기
 *  3. 알림이 오는 순간, 알림페이지에 있다면 -> 확인, 미확인을 나누긴 해야할 듯
 */

const NotificationButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    token ? navigate(NOTIFICATION) : navigate(SIGNIN);
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      {/* thinking: badgeContent={4}를 통해서 안에 숫자를 넣어주는 방향도 있다. */}
      <Badge variant='dot' color='primary'>
        <Notifications onClick={handleClick} />
      </Badge>
    </Box>
  );
};

export default NotificationButton;
