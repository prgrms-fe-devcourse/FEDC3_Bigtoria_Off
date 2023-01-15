import styled from '@emotion/styled';

import { Message } from '../../interfaces/message';

interface Prop {
  specificUser: Message;
}

const MessageBubble = ({ specificUser }: Prop) => {
  return (
    <BubbleWrap>
      <ContentsWrap>
        <MessageAtom>
          {specificUser.message} {specificUser.seen ? '봤음' : '안 봤음'}
        </MessageAtom>
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
