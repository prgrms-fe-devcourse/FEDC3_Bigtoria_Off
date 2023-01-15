import AlarmIcon from '@mui/icons-material/Alarm';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import NotificationList from '../components/Alarm/NotificationList';
import TabContainer from '../components/Alarm/TabContainer';
/*
 * TODO
 * 1. 알림 정보 받아오기
 *   - 사용자 토큰 확인
 *   - 없다면, 리다이렉션 or 로그인해주세요 문구?
 * 2. tab에 따라 다른 알림 정보 보여주기
 *   - 내부에 tabValue 상태 가지고 있음.
 */

const Notification = () => {
  const [tabValue, setTabValue] = useState('message');

  return (
    <Box
      sx={{
        minWidth: '320px',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        component='header'
        sx={{
          width: '92%',
          margin: '0 auto',
        }}>
        {/* Thinking: 알림을 아이콘 말고, 텍스트로 보여주기 */}
        <IconButton
          color='secondary'
          aria-label='add an alarm'
          sx={{
            marginBottom: '15px',
          }}>
          <AlarmIcon
            sx={{
              width: '50px',
              height: '50px',
            }}
          />
        </IconButton>
      </Box>
      <Box
        component='main'
        sx={{
          width: '92%',
          display: 'block',
          margin: '0 auto',
        }}>
        <Box
          component='section'
          sx={{
            marginBottom: '15px',
          }}>
          <TabContainer
            onClick={(type) => {
              setTabValue(type);
            }}
          />
        </Box>
        <Box component='section'>
          <NotificationList type={tabValue} />
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
