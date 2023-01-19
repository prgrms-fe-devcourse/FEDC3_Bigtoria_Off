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
import { useLocation } from 'react-router-dom';

import http from '../apis/instance';
import MessageInputForm from '../components/Message/MessageInputForm';
import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY } from '../constants/auth';
import { Message } from '../interfaces/message';
import { getLocalStorage } from '../utils/storage';

const Chat = () => {
  const hasToken = getLocalStorage(TOKEN_KEY) ? true : false;
  const { state: userInfo } = useLocation();
  const [conversationPartner, setConversationPartner] = useState(
    userInfo.user ?? ''
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [specificUsers, setSpecificUser] = useState<Message[]>([]);

  const handleListItemClick = (index: string) => {
    setConversationPartner(index);
  };

  useEffect(() => {
    (async () => {
      await http
        .get({
          url: API_URLS.MESSAGE.GET_MY_MESSAGES,
        })
        .then((data) => {
          setMessages(
            userInfo?.fullName === undefined
              ? data.data
              : data.data.find(
                  (user: Message) => user.receiver._id === userInfo.user
                )
              ? data.data
              : [
                  {
                    _id: [userInfo.user],
                    message: '',
                    sender: {
                      createdAt: '',
                      fullName: '나',
                    },
                    receiver: {
                      createdAt: '',
                      fullName: userInfo.fullName,
                      _id: userInfo.user,
                    },
                    seen: false,
                    createdAt: '',
                    updatedAt: '',
                  },
                  ...data.data,
                ]
          );
        });
    })();
  }, [specificUsers]);

  useEffect(() => {
    if (conversationPartner !== '') updateConversationPartner();
  }, [conversationPartner, specificUsers]);

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
                onClick={() => handleListItemClick(message.receiver._id)}
                selected={message.receiver._id === conversationPartner}>
                <ListItemAvatar>
                  <Avatar
                    alt={message.receiver.fullName}
                    src={message.receiver.image}
                  />
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
