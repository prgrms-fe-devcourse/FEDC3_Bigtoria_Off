import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';

import { Story, Title } from '../interfaces';

import { ERROR_MESSAGES } from '../constants/errorMessage';

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const storiesByYear = useMemo(() => {
    const yearsSet = new Set<string>();

    stories.forEach((story: Story) => {
      const { year }: Pick<Title, 'year'> = JSON.parse(story.title);
      yearsSet.add(year);
    });

    const yearsArray: string[] = Array.from(yearsSet).sort(
      (yearA, yearB) => +yearB - +yearA
    );

    const storiesSortedWithYear = yearsArray.map((year) => {
      const storiesFilteredByYear: Story[] = stories.filter((story: Story) => {
        const { year: yearOfStory }: Pick<Title, 'year'> = JSON.parse(
          story.title
        );

        return year === yearOfStory;
      });

      storiesFilteredByYear.sort((storyA, storyB) => {
        const {
          year: yearA,
          month: monthA,
          day: dayA,
        }: Pick<Title, 'year' | 'month' | 'day'> = JSON.parse(storyA.title);
        const {
          year: yearB,
          month: monthB,
          day: dayB,
        }: Pick<Title, 'year' | 'month' | 'day'> = JSON.parse(storyB.title);

        return (
          +new Date(`${yearA}.${monthA}.${dayA}`) -
          +new Date(`${yearB}.${monthB}.${dayB}`)
        );
      });

      return [year, ...storiesFilteredByYear];
    });

    return storiesSortedWithYear;
  }, [stories]);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedStories } = await axios({
          url: `${
            import.meta.env.VITE_API_URL
          }/posts/author/63bcf0d4f596c65f9ee2f226`,
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
