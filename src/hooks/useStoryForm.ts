import { ChangeEvent, FormEvent, useState, RefObject } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface Date {
  year: number;
  month: number;
  date: number;
}

interface StoryData {
  date: Date;
  title: string;
  image: string;
  description: string;
}

type Error = Pick<StoryData, 'title' | 'description'>;

const getDateInfo = (date: Dayjs) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  date: date.get('date'),
});

const today = dayjs(new Date());

const useForm = () => {
  const [values, setValues] = useState({
    date: getDateInfo(today),
    title: '',
    image: '',
    description: '',
  });
  const [date, setDate] = useState<Dayjs | null>(today);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<Error>({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    if (newValue) setValues({ ...values, date: getDateInfo(newValue) });
  };

  const encodeFileToBase64 = (fileBlob: any) => {
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
    encodeFileToBase64(e.target.files?.[0]);
  };

  const validate = ({ title, description }: Error) => {
    const errors = { title: '', description: '' };
    if (!title) errors.title = '제목을 입력해 주세요.';
    if (!description) errors.description = '내용을 입력해 주세요.';
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const newErrors = validate(values);
    if (!newErrors.title && !newErrors.description) {
      console.log('제출됨', values);
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
    handleSubmit,
  };
};

export default useForm;
