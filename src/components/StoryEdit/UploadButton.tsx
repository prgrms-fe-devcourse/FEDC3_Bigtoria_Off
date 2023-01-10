import { Button } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

const UploadButton = ({ value = {}, onChange = () => {} }) => {
  const [file, setFile] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const changedFile = files?.[0];
    if (!changedFile) return;
    setFile(changedFile);
    // onChange && onChange(changedFile);
  };

  const handleChooseFile = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <Button variant='outlined' component='label' onClick={handleChooseFile}>
      사진 추가
      <input
        hidden
        ref={inputRef}
        type='file'
        name='story-image'
        accept='image/*'
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default UploadButton;
