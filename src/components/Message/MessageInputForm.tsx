import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';

import http from '../../apis/instance';
import { Message } from '../../interfaces/message';
import MessageBubble from './MessageBubble';

const MessageInputForm = () => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [specificUsers, setSpecificUser] = useState<Message[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey) event.preventDefault();
  };

  const sendMessage = async () => {
    await http.post({
      url: '/messages/create',
      data: {
        message: 'hai',
        receiver: '63bcf0d4f596c65f9ee2f226',
      },
    });
  };

  useEffect(() => {
    (async () => {
      await http
        .get({
          url: '/messages',
          params: {
            userId: '63bcf0d4f596c65f9ee2f226',
          },
        })
        .then((data) => setSpecificUser(data.data));
    })();
  }, []);

  return (
    <ChatWrapper>
      <ChatList>
        {specificUsers?.map((specificUser) => (
          <MessageBubble
            key={specificUser.createdAt}
            specificUser={specificUser}
          />
        ))}
      </ChatList>
      <MessageInputFormWrap onSubmit={handleSubmit}>
        <MessageInput
          ref={messageInputRef}
          data-testid='textarea'
          cols={30}
          rows={5}
          onKeyPress={handleOnKeyPress}
        />
        <MessageInputSubmitButton
          data-testid='submit'
          type='submit'
          onClick={sendMessage}>
          <SendIcon />
        </MessageInputSubmitButton>
      </MessageInputFormWrap>
    </ChatWrapper>
  );
};

export default MessageInputForm;

const ChatWrapper = styled.div`
  width: 60%;
`;

const MessageInputFormWrap = styled.form`
  position: absolute;
  bottom: 0px;
  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 58%;
  padding: 1rem 0;
`;

const MessageInput = styled.textarea`
  all: unset;
  height: 55px;
  width: 100%;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  padding: 4px;
`;

const MessageInputSubmitButton = styled.button`
  all: unset;
  height: 55px;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  padding: 4px;
`;

const ChatList = styled.div`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  padding-bottom: 100px;
`;
