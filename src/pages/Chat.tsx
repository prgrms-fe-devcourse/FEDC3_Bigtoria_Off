import axios from 'axios';
import { useEffect, useState } from 'react';

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
      {specificUser?.map((messageTotal) => {
        return (
          <div key={messageTotal.createdAt}>
            <div>
              {messageTotal.message} {messageTotal.seen ? '봤음' : '안 봤음'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
