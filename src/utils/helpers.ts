import { Dayjs } from 'dayjs';

export const changeColorTheme = (nextDisplayMode: 'dark' | 'light') => {
  nextDisplayMode === 'dark'
    ? document.documentElement.setAttribute('color-theme', 'dark')
    : document.documentElement.setAttribute('color-theme', 'light');
};

export const getDateInfo = (date: Dayjs) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  day: date.get('date'),
});
