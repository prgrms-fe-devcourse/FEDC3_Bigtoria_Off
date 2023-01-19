import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ERROR_MESSAGES } from '../constants/errorMessages';
import {
  StoriesWithYear,
  Story,
  StoryDate,
  StoryMonth,
  StoryYear,
} from '../interfaces/story';
import { getStoriesOfUser } from './../apis/story';
import { userInfo } from './../apis/userInfo';
import { ROUTES } from './../constants/routes';

const TOTAL_MONTHS_NUMBER = 12;

const useFetchStories = () => {
  const [fullName, setFullName] = useState('');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const storiesByYear = useMemo(() => {
    const yearsSet = new Set<string>();
    const storiesWithYear: StoriesWithYear[] = [];

    stories.forEach((story: Story) => {
      const { year }: StoryYear = JSON.parse(story.title);
      if (!year) return;
      yearsSet.add(year);
    });

    yearsSet.forEach((year) => {
      const months = new Array(TOTAL_MONTHS_NUMBER).fill(false);

      const storiesFilteredByYear: Story[] = stories.filter((story: Story) => {
        const { year: yearOfStory }: StoryYear = JSON.parse(story.title);

        return year === yearOfStory;
      });

      storiesFilteredByYear.sort((storyA, storyB) => {
        const {
          year: yearA,
          month: monthA,
          day: dayA,
        }: StoryDate = JSON.parse(storyA.title);
        const {
          year: yearB,
          month: monthB,
          day: dayB,
        }: StoryDate = JSON.parse(storyB.title);

        return (
          +new Date(
            `${String(yearA)}-${String(monthA).padStart(2, '0')}-${String(
              dayA
            ).padStart(2, '0')}`
          ) -
          +new Date(
            `${String(yearB)}-${String(monthB).padStart(2, '0')}-${String(
              dayB
            ).padStart(2, '0')}`
          )
        );
      });

      storiesFilteredByYear.forEach((story) => {
        const { month }: StoryMonth = JSON.parse(story.title);
        if (!months[Number(month) - 1]) {
          months[Number(month) - 1] = true;
          story.isFirstInSameMonths = true;
        }
      });

      storiesWithYear.push({
        year,
        stories: storiesFilteredByYear,
      });
    });

    storiesWithYear.sort(
      (storiesA, storiesB) => +storiesB.year - +storiesA.year
    );

    return storiesWithYear;
  }, [stories]);

  useEffect(() => {
    const fetchStoriesAndUser = async () => {
      setIsLoading(true);
      try {
        if (userId) {
          const fetchedStories = await getStoriesOfUser(userId);
          const { fullName } = await userInfo(userId);
          setStories(fetchedStories);
          setFullName(fullName);
        } else {
          navigate(ROUTES.NOT_FOUND);
        }
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_STORIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoriesAndUser();
  }, [userId]);

  return { storiesByYear, fullName, isLoading };
};

export default useFetchStories;
