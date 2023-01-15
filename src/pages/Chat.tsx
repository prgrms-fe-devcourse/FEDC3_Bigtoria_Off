import styled from '@emotion/styled';

import MessageConversation from '../components/Message/MessageConversation';
import MessageInputForm from '../components/Message/MessageInputForm';

const Chat = () => {
  return (
    <Wrap>
      <MessageConversation />
      <MessageInputForm />
    </Wrap>
  );
};

export default Chat;

const Wrap = styled.div`
  display: flex;
  height: 400px;
`;
