import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface Props {
  src: string;
  onChange: (file: File) => void;
  onDelete: () => void;
}

const ImageUpload = ({ src, onChange, onDelete }: Props) => {
  const [currentImage, setCurrentImage] = useState<File | null>();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentImage(file);
      onChange(file);
    }
  };

  const handleFileDelete = () => {
    setCurrentImage(null);
    onDelete();
  };

  const handleFileChoose = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items?.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setCurrentImage(file);
      onChange(file);
    }
  };

  return (
    <>
      <UploadContainer
        sx={{
          borderColor: dragging ? 'black' : 'grey',
        }}
        onClick={handleFileChoose}
        onDrop={handleFileDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}>
        <input
          hidden
          ref={inputRef}
          type='file'
          name='image'
          accept='image/jpg, image/jpeg, image/png'
          onChange={handleFileChange}
        />
        {src ? (
          <ImagePreview src={src} alt='이미지 미리보기' />
        ) : (
          <ImagePlaceholder>
            클릭하여 이미지를 추가하거나
            <br />
            이미지를 드래그하세요
          </ImagePlaceholder>
        )}
      </UploadContainer>
      {(src || currentImage) && (
        <Button color='warning' onClick={handleFileDelete}>
          삭제
        </Button>
      )}
    </>
  );
};

export default ImageUpload;

const UploadContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 1px dashed grey;
`;

const ImagePlaceholder = styled.div`
  color: grey;
  text-align: center;
  line-height: 1.4rem;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;
