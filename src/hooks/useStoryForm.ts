import { ChangeEvent, FormEvent, useState } from 'react';
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
    description: '',
  });
  const [date, setDate] = useState<Dayjs | null>(today);
  const [image, setImage] = useState<File>();
  const [errors, setErrors] = useState<Error>({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    newValue && setValues({ ...values, date: getDateInfo(newValue) });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setImage(file);
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
    if (Object.keys(newErrors).length === 0) {
      // await onSubmit(values);
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
