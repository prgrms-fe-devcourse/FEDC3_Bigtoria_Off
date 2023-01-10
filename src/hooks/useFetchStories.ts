import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';

import { StoryDate, Story, StoriesWithYear } from '../interfaces/story';

import { ERROR_MESSAGES } from '../constants/errorMessages';

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const storiesByYear = useMemo(() => {
    const yearsSet = new Set<string>();
    const storiesWithYear: StoriesWithYear[] = [];

    stories.forEach((story: Story) => {
      const { year }: Pick<StoryDate, 'year'> = JSON.parse(story.title);
      yearsSet.add(year);
    });

    yearsSet.forEach((year) => {
      const storiesFilteredByYear: Story[] = stories.filter((story: Story) => {
        const { year: yearOfStory }: Pick<StoryDate, 'year'> = JSON.parse(
          story.title
        );

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
        const { data: fetchedStories } = await axios({
          url: `${import.meta.env.VITE_API_URL}/posts/author/${userId}`,
          method: 'GET',
        });
        setStories(fetchedStories);
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
