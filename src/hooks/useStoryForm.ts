import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';

import { StoryData } from '../interfaces/story';

const getDateInfo = (date: Dayjs) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  date: date.get('date'),
});

const today = dayjs(new Date());

const isBlank = (string: string) => {
  return string.trim().length === 0;
};

const useStoryForm = () => {
  const [values, setValues] = useState({
    date: getDateInfo(today),
    title: '',
    image: '',
    content: '',
  });
  const [date, setDate] = useState<Dayjs | null>(today);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    if (newValue) setValues({ ...values, date: getDateInfo(newValue) });
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        if (!reader.result || typeof reader.result !== 'string') return;
        const result = reader.result;
        setImage(result);
        setValues({ ...values, image: result });
        resolve(Promise);
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    encodeFileToBase64(e.target.files?.[0]);
  };

  const handleImageDelete = () => {
    setImage('');
    setValues({ ...values, image: '' });
  };

  const validate = ({
    title,
    content,
  }: Pick<StoryData, 'title' | 'content'>) => {
    const errors = { title: '', content: '' };
    if (!title || isBlank(title)) errors.title = '제목을 입력해 주세요.';
    if (!content || isBlank(content)) errors.content = '내용을 입력해 주세요.';
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const newErrors = validate(values);
    if (!newErrors.title && !newErrors.content) {
      // onSubmit(values)
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    date,
    image,
    errors,
    isLoading,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleImageDelete,
    handleSubmit,
  };
};

export default useStoryForm;
