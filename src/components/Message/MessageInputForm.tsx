import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import { useEffect, useRef } from 'react';

import http from '../../apis/instance';
import { Message } from '../../interfaces/message';
import MessageBubble from './MessageBubble';

interface Prop {
  conversationPartner: string;
  specificUsers: Message[];
}

const MessageInputForm = ({ conversationPartner, specificUsers }: Prop) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleKeyboardEvent = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!messageInputRef.current) return;

    await http.post({
      url: '/messages/create',
      data: {
        message: messageInputRef.current?.value,
        receiver: conversationPartner,
      },
    });

    messageInputRef.current.value = '';
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [specificUsers]);

  return (
    <ChatWrapper>
      <ChatList ref={scrollRef}>
        {specificUsers?.map((specificUser) => (
          <MessageBubble
            key={specificUser.createdAt}
            specificUser={specificUser}
          />
        ))}
      </ChatList>
      <MessageInputFormWrap onSubmit={handleSubmit}>
        <MessageInput
          onKeyDown={handleKeyboardEvent}
          autoFocus
          ref={messageInputRef}
          data-testid='textarea'
          cols={30}
          rows={5}
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
  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`;

const MessageInput = styled.textarea`
  all: unset;
  height: 55px;
  width: 60%;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  padding: 14px;
`;

const MessageInputSubmitButton = styled.button`
  all: unset;
  height: 55px;
  border: 1px solid #e2e5e6;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  padding: 14px;
`;

const ChatList = styled.div`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;
