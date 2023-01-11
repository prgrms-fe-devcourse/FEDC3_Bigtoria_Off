import './title.css';

import { createTheme, ThemeProvider, Typography } from '@mui/material';

interface Props {
  title: string;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Dancing Script', cursive",
  },
});

const Title = ({ title }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant='h1'
        sx={{ display: 'inline-block', padding: '20px' }}
      >
        {title}
      </Typography>
    </ThemeProvider>
  );
};

export default Title;
