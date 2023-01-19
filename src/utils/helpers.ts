export const changeColorTheme = (nextDisplayMode: 'dark' | 'light') => {
  nextDisplayMode === 'dark'
    ? document.documentElement.setAttribute('color-theme', 'dark')
    : document.documentElement.setAttribute('color-theme', 'light');
};
