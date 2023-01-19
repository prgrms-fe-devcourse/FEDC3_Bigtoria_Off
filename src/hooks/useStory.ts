import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteStory, getStoryDetail, postStory } from '../apis/story';
import { CHANNEL_ID } from '../constants/apiParams';
import { ROUTES } from '../constants/routes';
import { Story } from '../interfaces/story';
import { isBlankString } from '../utils/validations';
import { getStoriesOfChannel, putStory } from './../apis/story';
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
  const { storyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      try {
        if (!storyId) {
          navigate(ROUTES.NOT_FOUND);
          return;
        }
        if (storyId === 'new') return;

        const stories = await getStoriesOfChannel(CHANNEL_ID);
        if (!stories.find((story: Story) => story._id === storyId)) {
          alert('존재하지 않는 스토리입니다.');
          navigate(ROUTES.HOME);
          return;
        }

        const storyDetail = await getStoryDetail(storyId);
        setStory(storyDetail);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_STORY);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

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

  return { story, isLoading, fetchComment };
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

  const handleImageChange = (imageFile: File) => {
    setImageFile(imageFile);
    encodeFileToBase64(imageFile);
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
    formData.append('channelId', CHANNEL_ID);
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
    if (newErrors.title || newErrors.content) {
      setErrors(newErrors);
      setIsLoading(false);
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
        navigate(ROUTES.STORY_BOOK_BY_USER_ID(authorId));
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_DELETING_STORY);
      }
    }
  };

  return { handleDelete };
};
