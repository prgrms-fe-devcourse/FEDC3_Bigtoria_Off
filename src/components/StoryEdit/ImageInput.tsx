import { Button } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ onChange }: Props) => {
  return (
    <>
      <Button variant='outlined' component='label'>
        사진 추가
        <input
          hidden
          name='image'
          type='file'
          accept='image/*'
          onChange={onChange}
        />
      </Button>
    </>
  );
};

export default ImageInput;
