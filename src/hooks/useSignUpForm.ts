import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin } from '../apis/auth';
import { postSignUp } from '../apis/signup';
import { getUserList } from '../apis/userList';
import { CHANNEL_ID } from '../constants/apiParams';
import { User } from '../interfaces/user';
import { getDateInfo } from '../utils/helpers';
import { signUpIsValid } from '../utils/signUpIsValid';
import { signUpValidate } from '../utils/signUpValidate';
import { postStory } from './../apis/story';
import { ROUTES } from './../constants/routes';

const error = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: '',
  job: '',
};

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  date: getDateInfo(dayjs(new Date())),
  job: '',
};

const today = dayjs(new Date());

const useSignUpForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(error);
  const [date, setDate] = useState<Dayjs | null>(today);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'fullName') setIsChecked(false);
    setValues({ ...values, [name]: value.replace(/\s/g, '') });
  };

  const handleDuplicate = async () => {
    const res = await getUserList();
    const nameList = res.map((user: User) => user.fullName);
    const fullNameRegex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,8}$/;
    const koreanRegex = /^[A-Za-z0-9가-힣]{2,8}$/;
    if (nameList.includes(values.fullName)) {
      alert('중복된 닉네임 입니다. 다른 닉네임을 입력해주세요.');
    } else if (!fullNameRegex.test(values.fullName))
      alert('영어, 한글, 숫자 (2~8자리)로 입력해주세요.');
    else if (!koreanRegex.test(values.fullName))
      alert(
        '한글은 완성된 단어로 입력해주세요. \n(자음과 모음은 독립적으로 사용이 불가능합니다.)'
      );
    else {
      alert('사용가능한 닉네임입니다.');
      setErrors({ ...errors, fullName: '' });
      setIsChecked(true);
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    if (newValue) setValues({ ...values, date: getDateInfo(newValue) });
  };

  const generateFormData = () => {
    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        storyTitle: `${values.fullName}님 탄생일`,
        year: values.date.year,
        month: values.date.month,
        day: values.date.day,
        content: '🥳 해삐 바쓰데이 🎉',
      })
    );
    formData.append('channelId', CHANNEL_ID);
    return formData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newError = signUpValidate(values);
    setErrors(newError);

    if (signUpIsValid(newError)) {
      setIsLoading(true);
      if (!isChecked) {
        alert('중복확인 버튼을 눌러주세요');
        setIsLoading(false);
        return;
      }
      try {
        await postSignUp(values);
        await signin({ email: values.email, password: values.password });
        const formData = generateFormData();
        await postStory(formData);
        navigate(ROUTES.HOME);
        setTimeout(function () {
          alert('가입이 완료되었습니다.');
        }, 0);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    values,
    isLoading,
    date,
    handleSubmit,
    handleChange,
    handleDateChange,
    handleDuplicate,
    errors,
  };
};

export default useSignUpForm;
