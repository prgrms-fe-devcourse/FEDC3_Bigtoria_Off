import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteStory, getStoryDetail, postStory } from '../apis/story';
import { ROUTES } from '../constants/routes';
import { isBlankString } from '../utils/validations';
import { putStory } from './../apis/story';
import { ERROR_MESSAGES } from './../constants/errorMessages';

export const useFetchStory = () => {
  const [story, setStory] = useState({
    likes: [],
    comments: [],
    _id: '',
    image: '',
    imagePublicId: '',
    title: '',
    channel: {},
    author: { image: '', fullName: '', _id: '', role: '' },
    createdAt: '',
    updatedAt: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { storyId } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      try {
        if (!storyId) return Error('잘못된 스토리 접근(storyId)'); // TODO: 404 페이지로 리다이렉트

        if (storyId === 'new') {
          setIsNew(true);
        } else {
          const fetchedStories = await getStoryDetail(storyId);
          setStory(fetchedStories);
        }
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_STORY);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, []);

  const fetchComment = async () => {
    try {
      if (storyId) {
        const fetchedStories = await getStoryDetail(storyId);
        setStory({ ...story, comments: fetchedStories.comments });
      }
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_COMMENT);
    }
  };

  return { story, isNew, isLoading, fetchComment };
};

const getDateInfo = (date: Dayjs) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  date: date.get('date'),
});
interface StoryInfo {
  title: string;
  date: {
    year: number;
    month: number;
    date: number;
  };
  imageURL?: string;
  content: string;
}

export const useStoryForm = (initialValues: StoryInfo | undefined) => {
  const channelId = '63b6822ade9d2a22cc1d45c3';
  const today = dayjs(new Date());

  const [values, setValues] = useState(
    initialValues || {
      title: '',
      date: getDateInfo(today),
      content: '',
    }
  );
  const [date, setDate] = useState<Dayjs | null>(() => {
    if (initialValues && Object.keys(initialValues.date).length) {
      const { year, month, date } = initialValues.date;
      return dayjs(new Date(year, month - 1, date));
    }

    return today;
  });
  const [imageBase64, setImageBase64] = useState('');
  const [imageFile, setImageFile] = useState<File | null>();
  const [errors, setErrors] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { storyId } = useParams();

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
        setImageBase64(result);
        resolve(Promise);
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFile(e.target.files?.[0]);
    encodeFileToBase64(e.target.files?.[0]);
  };

  const handleImageDelete = () => {
    setValues({ ...values, imageURL: '' });
    setImageFile(null);
    setImageBase64('');
  };

  const validate = () => {
    const { title, content } = values;
    const errors = { title: '', content: '' };
    if (!title || isBlankString(title)) errors.title = '제목을 입력해 주세요.';
    if (!content || isBlankString(content))
      errors.content = '내용을 입력해 주세요.';

    return errors;
  };

  const generateFormData = (imagePublicId: string) => {
    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        storyTitle: values.title,
        year: values.date.year,
        month: values.date.month,
        day: values.date.date,
        content: values.content,
      })
    );
    formData.append('channelId', channelId);
    initialValues && storyId && formData.append('postId', storyId);

    if (values.imageURL) return formData;

    imageFile
      ? formData.append('image', imageFile)
      : formData.append('imageToDeletePublicId', imagePublicId);

    return formData;
  };

  const handleSubmit = async (e: FormEvent, imagePublicId: string) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = generateFormData(imagePublicId);
      const story = initialValues
        ? await putStory(formData)
        : await postStory(formData);

      navigate(ROUTES.STORY_BY_STORY_ID(story._id));
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_STORY);
    }
    setIsLoading(false);
  };

  return {
    values,
    date,
    imageBase64,
    errors,
    isLoading,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleImageDelete,
    handleSubmit,
  };
};

export const useDeleteStory = () => {
  const navigate = useNavigate();

  const handleDelete = async (storyId: string, authorId: string) => {
    if (confirm('스토리를 삭제하시겠습니까?')) {
      try {
        if (!storyId) throw Error();
        await deleteStory(storyId);
        navigate(`/story-book/${authorId}`);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_DELETING_STORY);
      }
    }
  };

  return { handleDelete };
};
