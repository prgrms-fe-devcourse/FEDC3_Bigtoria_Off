import styled from '@emotion/styled';

import { Message } from '../../interfaces/message';

interface Prop {
  specificUser: Message;
}

const MessageBubble = ({ specificUser }: Prop) => {
  return (
    <BubbleWrap>
      <ContentsWrap>
        <BubbleAtom>
          <Seen>{!specificUser.seen && '1'}</Seen>
          <MessageAtom>{specificUser.message}</MessageAtom>
        </BubbleAtom>
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

const MessageAtom = styled.div<{ fromUser?: boolean }>`
  max-width: 300px;
  background-color: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: ${(props) => (props.fromUser ? null : 'right')};
  float: ${(props) => (props.fromUser ? 'left' : 'right')};
`;

const BubbleAtom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 4px;
`;

const Seen = styled.p`
  font-size: 12px;
  color: #777777;
`;
