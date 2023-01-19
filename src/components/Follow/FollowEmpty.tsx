import { Box } from '@mui/material';

interface Props {
  type: string;
}

const FollowEmpty = ({ type }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
      }}>
      {type === 'following' ? (
        <Box>팔로우가 비어있어요...ㅠ.ㅠ</Box>
      ) : (
        <Box>팔로워가 비어있어요...ㅠ.ㅠ</Box>
      )}
    </Box>
  );
};

export default FollowEmpty;
