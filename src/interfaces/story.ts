import { Comment } from './comment';
import { Like } from './like';
import { User } from './user';

export interface Story {
  _id: string;
  title: string;
  image: string;
  isFirstInSameMonths?: boolean;
}

export interface StoryWithIsFirstInSameMonths extends Story {
  isFirstInSameMonths: boolean;
}

export interface StoryYear {
  year: string;
}

export interface StoryMonth {
  month: string;
}

export interface StoryDay {
  day: string;
}

export interface Title {
  storyTitle: string;
}

export interface StoryDate extends StoryYear, StoryMonth, StoryDay {}

export interface StoriesWithYear extends StoryYear {
  stories: Story[];
}

export interface StoryData {
  likes: Like[];
  comments: Comment[];
  _id: string;
  imagePublicId: string;
  image: string;
  title: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface StoryInfo {
  title: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  imageURL?: string;
  content: string;
}
