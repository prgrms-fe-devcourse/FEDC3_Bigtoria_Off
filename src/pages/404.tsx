import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import notFound from '../assets/images/notFound.png';
import { COLORS } from '../constants/colors';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <WarningContainer>
      <Image src={notFound} />
      <Typography variant='h4' component='h4' color={COLORS.ERROR}>
        페이지를 찾을수 없습니다
      </Typography>
      <Typography
        variant='body1'
        component='span'
        color={COLORS.SUB}
        textAlign='center'
        margin='1rem 0 1rem 0'>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </Typography>
      <Button variant='outlined' color='warning' onClick={() => navigate('/')}>
        홈으로 돌아가기
      </Button>
    </WarningContainer>
  );
};

export default NotFound;

const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 20vw;
`;
