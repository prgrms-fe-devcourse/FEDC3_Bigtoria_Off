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
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import http from '../apis/instance';
import { TOKEN_KEY } from '../constants/auth';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

const API_END_POINT = import.meta.env.VITE_API_URL;

interface Message {
  _id: string[];
  message: string;
  sender: {
    createdAt: string;
    fullName: string;
  };
  receiver: {
    createdAt: string;
    fullName: string;
  };
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

const Chat = () => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [token, setToken] = useState(getLocalStorage(TOKEN_KEY) ?? '');
  const [message, setMessage] = useState<Message[]>([]);
  const [specificUser, setSpecificUser] = useState<Message[]>([]);

  useEffect(() => {
    setToken(getLocalStorage(TOKEN_KEY));
  }, [getLocalStorage(TOKEN_KEY)]);

  const login = async () => {
    await axios
      .post(`${API_END_POINT}/login`, {
        email: import.meta.env.VITE_EMAIL,
        password: import.meta.env.VITE_PASSWORD,
      })
      .then((data) => setLocalStorage('token', data.data.token));
  };

  const getMessages = async () => {
    await http
      .get({
        url: '/messages/conversations',
      })
      .then((data) => {
        console.log(data.data);
        setMessage(data.data);
        console.log('hi', message);
      });
  };

  const getUserList = async () => {
    await axios.get(`${API_END_POINT}/users/get-users`).then((data) => {
      console.log(data.data);
    });
  };

  const sendMessage = async () => {
    await http
      .post({
        url: '/messages/create',
        data: {
          message: 'hai',
          receiver: '63bcf0d4f596c65f9ee2f226',
        },
      })
      .then((data) => console.log(data));
  };

  useEffect(() => {
    message.map((messageTotal) => messageTotal);
  }, [message]);

  const roadMessages = async () => {
    await http
      .get({
        url: '/messages',
        params: {
          userId: '63bcf0d4f596c65f9ee2f226',
        },
      })
      .then((data) => setSpecificUser(data.data));
  };

  useEffect(() => {
    specificUser.map((messageTotal) => messageTotal);
  }, [specificUser, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey) event.preventDefault();
  };

  return (
    <div>
      <button onClick={getUserList}>유저 목록 불러오기</button>
      <button onClick={login}>로그인</button>
      <div>{token === '' ? '토큰이 없어요' : '토큰이 있어요'}</div>
      <button onClick={getMessages}>메세지 불러오기</button>
      <div>
        {message?.map((messageTotal) => {
          return (
            <div key={messageTotal.createdAt}>
              <div>유저 이름: {messageTotal.receiver.fullName}</div>
              <div>가장 최근 대화 : {messageTotal.message}</div>
            </div>
          );
        })}
      </div>
      <button onClick={sendMessage}>hi 메세지 보내기</button>
      <button onClick={roadMessages}>
        특정사용자와의 메세지 목록 불러오기
      </button>

      <Wrap>
        <List sx={{ width: '35%' }}>
          {[0, 1, 2, 3].map((value) => {
            return (
              <ListItem key={value} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${value + 1}`} src={''} />
                  </ListItemAvatar>
                  <ListItemText
                    id={'1'}
                    primary={`퉁이리`}
                    secondary={
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        <TypoContents>
                          안녕하세요<div>22:20</div>
                        </TypoContents>
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <ChatWrapper>
          {specificUser?.map((messageTotal) => {
            return (
              <div key={messageTotal.createdAt}>
                <div>
                  {messageTotal.message}{' '}
                  {messageTotal.seen ? '봤음' : '안 봤음'}
                </div>
              </div>
            );
          })}
          <MessageInputFormWrap onSubmit={handleSubmit}>
            <MessageInput
              ref={messageInputRef}
              data-testid='textarea'
              cols={30}
              rows={5}
              onKeyPress={handleOnKeyPress}
            />
            <MessageInputSubmitButton data-testid='submit' type='submit'>
              보내기
            </MessageInputSubmitButton>
          </MessageInputFormWrap>
        </ChatWrapper>
      </Wrap>
    </div>
  );
};

export default Chat;

const Wrap = styled.div`
  display: flex;
  min-height: 50vh;
`;

const TypoContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChatWrapper = styled.div`
  width: 100%;
`;

const MessageInputFormWrap = styled.form`
  position: relative;
  bottom: 0px;
  width: 100%;
  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageInput = styled.textarea`
  all: unset;
  width: 70%;
  height: 55px;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  padding: 4px;
`;

const MessageInputSubmitButton = styled.button`
  all: unset;
  width: 20%;
  height: 55px;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  padding: 4px;
`;
