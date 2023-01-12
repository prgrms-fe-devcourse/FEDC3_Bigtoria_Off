import { Avatar } from '@mui/material';
import { Container } from '@mui/system';

interface Props {
  src: string;
  size?: string;
  hover?: boolean;
}

const ImageAvatar = ({ src, size = '100px' }: Props) => {
  return (
    <Container>
      <Avatar
        src={src}
        sx={{
          width: size,
          height: size,
          transition: 'filter 0.3s ease-in-out',
          '&:hover': {
            filter: 'blur(2px)',
          },
        }}
      />
    </Container>
  );
};

export default ImageAvatar;
