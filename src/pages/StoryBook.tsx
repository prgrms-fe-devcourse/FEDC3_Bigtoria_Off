import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { stories, isLoading } = useFetchStories();

  return <div></div>;
};

export default StoryBook;
