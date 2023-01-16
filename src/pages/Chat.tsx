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

import http from '../apis/instance';
import MessageInputForm from '../components/Message/MessageInputForm';
import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY } from '../constants/auth';
import { Message } from '../interfaces/message';
import { getLocalStorage } from '../utils/storage';

const hasToken = getLocalStorage(TOKEN_KEY) ? true : false;

const Chat = () => {
  const [conversationPartner, setConversationPartner] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(conversationPartner);
  const [messages, setMessages] = useState<Message[]>([]);
  const [specificUsers, setSpecificUser] = useState<Message[]>([]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    (async () => {
      await http
        .get({
          url: API_URLS.MESSAGE.GET_MY_MESSAGES,
        })
        .then((data) => {
          setMessages(data.data);
          setConversationPartner(data.data[0].receiver._id);
          setSelectedIndex(data.data[0].receiver._id);
        });
    })();
  }, []);

  useEffect(() => {
    if (conversationPartner !== '') updateConversationPartner();
  }, [conversationPartner]);

  const updateConversationPartner = async () => {
    await http
      .get({
        url: '/messages',
        params: {
          userId: conversationPartner,
        },
      })
      .then((data) => setSpecificUser(data.data));
  };

  return (
    <Wrapper>
      <List sx={{ width: '40%' }}>
        {!hasToken && <div>로그인이 필요해요</div>}
        {messages?.map((message) => {
          return (
            <ListItem
              key={message.createdAt}
              disablePadding
              onClick={() => {
                setConversationPartner(message.receiver._id);
                updateConversationPartner();
              }}>
              <ListItemButton
                onClick={(event) =>
                  handleListItemClick(event, message.receiver._id)
                }
                selected={selectedIndex === conversationPartner}>
                <ListItemAvatar>
                  <Avatar alt={message.receiver.fullName} src={''} />
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
      <MessageInputForm
        conversationPartner={conversationPartner}
        specificUsers={specificUsers}
      />
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  display: flex;
  height: 70vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TypoContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.6rem;
`;
