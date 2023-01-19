import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

import { USER_ID_KEY } from '../../constants/auth';
import { Message } from '../../interfaces/message';
import { getLocalStorage } from '../../utils/storage';

interface Prop {
  specificUser: Message;
}

const MessageBubble = ({ specificUser }: Prop) => {
  const loginID = getLocalStorage(USER_ID_KEY);
  const isReceiver = specificUser.sender._id !== loginID;
  return (
    <BubbleWrap>
      {isReceiver && <Avatar src={specificUser.sender.image} />}
      <ContentsWrap>
        {isReceiver && <UserName>{specificUser.sender.fullName}</UserName>}
        <MessageAtom fromUser={isReceiver}>{specificUser.message}</MessageAtom>
      </ContentsWrap>
    </BubbleWrap>
  );
};

export default MessageBubble;

const BubbleWrap = styled.div`
  margin: 20px;
  display: flex;
`;

const ContentsWrap = styled.div`
  width: 100%;
  justify-self: flex-end;
`;

const MessageAtom = styled.div<{ fromUser: boolean }>`
  max-width: 300px;
  background-color: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: ${(props) => (props.fromUser ? null : 'right')};
  float: ${(props) => (props.fromUser ? 'left' : 'right')};
`;

const UserName = styled.div`
  font-size: 0.9em;
`;
