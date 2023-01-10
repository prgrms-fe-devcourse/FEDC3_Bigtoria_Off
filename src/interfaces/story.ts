export interface Story {
  _id: string;
  title: string;
  image: string;
}

export interface StoryDate {
  year: string;
  month: string;
  day: string;
}

export interface Title {
  realTitle: string;
}

export interface StoriesWithYear {
  year: string;
  stories: Story[];
}

export interface StoryInfo extends Date, Title {}
