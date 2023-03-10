import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteStory, getStoryDetail, postStory } from '../apis/story';
import { CHANNEL_ID } from '../constants/apiParams';
import { ROUTES } from '../constants/routes';
import { Story, StoryData, StoryInfo } from '../interfaces/story';
import { getDateInfo } from '../utils/helpers';
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

const initialValues = {
  title: '',
  date: getDateInfo(dayjs(new Date())),
  imageURL: '',
  content: '',
};

const getInitialValues = (story: StoryData) => {
  if (!story || !story?.title) return initialValues;
  else {
    const { storyTitle, year, month, day, content } = JSON.parse(story.title);
    return {
      title: storyTitle,
      date: { year: Number(year), month: Number(month), day: Number(day) },
      imageURL: story.image,
      content,
    };
  }
};

interface Date {
  year: number;
  month: number;
  day: number;
}

const generateDayjsDate = (date: Date): Dayjs => {
  if (Object.keys(date).length) {
    const { year, month, day } = date;
    return dayjs(new Date(year, month - 1, day));
  }
  return dayjs(new Date());
};

export const useStoryForm = (story: StoryData) => {
  const [values, setValues] = useState<StoryInfo>(initialValues);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [imageBase64, setImageBase64] = useState('');
  const [imageFile, setImageFile] = useState<File | null>();
  const [errors, setErrors] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { storyId } = useParams();

  useEffect(() => {
    const { title, date, content, imageURL } = getInitialValues(story);
    setValues({ ...values, title, date, content, imageURL });
    setDate(generateDayjsDate(date));
  }, [story]);

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
        day: values.date.day,
        content: values.content,
      })
    );
    formData.append('channelId', CHANNEL_ID);
    story && storyId && formData.append('postId', storyId);

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
      const storyData = story
        ? await putStory(formData)
        : await postStory(formData);
      navigate(ROUTES.STORY_BY_STORY_ID(storyData._id), { state: storyData });
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
