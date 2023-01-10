export interface Story {
  _id: string;
  title: string;
  image: string;
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
  realTitle: string;
}

export interface StoryDate extends StoryYear, StoryMonth, StoryDay {}

export interface StoriesWithYear extends StoryYear {
  stories: Story[];
}
