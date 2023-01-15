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

const TOTAL_MONTHS_NUMBER = 12;

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const storiesByYear = useMemo(() => {
    const yearsSet = new Set<string>();
    const storiesWithYear: StoriesWithYear[] = [];

    stories.forEach((story: Story) => {
      const { year }: StoryYear = JSON.parse(story.title);
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
          +new Date(`${yearA}.${monthA}.${dayA}`) -
          +new Date(`${yearB}.${monthB}.${dayB}`)
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
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        if (userId) {
          const fetchedStories = await getStoriesOfUser(userId);
          setStories(fetchedStories);
        } else {
          // todo: 404 페이지로 리다이렉팅
          // navigate(404 페이지)
        }
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_STORIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { storiesByYear, isLoading };
};

export default useFetchStories;
