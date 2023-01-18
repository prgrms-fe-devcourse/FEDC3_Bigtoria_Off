import './fontText.css';

import { createTheme, ThemeProvider, Typography } from '@mui/material';

interface Props {
  title: string;
  sx: {
    display?: string;
    marginTop?: string;
    marginBottom?: string;
    fontSize?: string;
    paddingLeft?: string;
  };
}

const theme = createTheme({
  typography: {
    fontFamily: "'MaplestoryOTFLight', cursive",
  },
});

const FontText = ({ title, sx }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography component='p' sx={{ ...sx, paddingTop: '4px' }}>
        {title}
      </Typography>
    </ThemeProvider>
  );
};

export default FontText;
