import styled from '@emotion/styled';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import http from '../../apis/instance';
import { Message } from '../../interfaces/message';

const MessageConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      await http
        .get({
          url: '/messages/conversations',
        })
        .then((data) => setMessages(data.data))
        .catch(() => setError(true));
    })();
  }, [messages]);

  return (
    <List sx={{ width: '40%', overflowY: 'scroll' }}>
      {error && <div>로그인이 필요해요</div>}
      {messages?.map((message) => {
        return (
          <ListItem key={message.createdAt} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°$`} src={''} />
              </ListItemAvatar>
              <ListItemText
                id={message.receiver.createdAt}
                primary={message.receiver.fullName}
                secondary={
                  <Typography
                    component='span'
                    variant='body2'
                    color='text.primary'>
                    <TypoContents>
                      {message.message}
                      <div>{message.updatedAt}</div>
                    </TypoContents>
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MessageConversation;

const TypoContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.6rem;
`;
