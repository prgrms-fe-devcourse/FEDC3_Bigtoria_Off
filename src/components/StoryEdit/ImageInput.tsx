import { Button } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  isAdded: boolean;
}

const ImageInput = ({ onChange, onDelete, isAdded = false }: Props) => {
  return (
    <>
      <Button variant='outlined' component='label'>
        사진 {isAdded ? '변경' : '추가'}
        <input
          hidden
          name='image'
          type='file'
          accept='image/*'
          onChange={onChange}
        />
      </Button>
      {isAdded && (
        <Button variant='outlined' onClick={onDelete}>
          삭제
        </Button>
      )}
    </>
  );
};

export default ImageInput;
