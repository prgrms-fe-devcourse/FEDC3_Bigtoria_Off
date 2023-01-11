import './fontText.css';

import { createTheme, ThemeProvider, Typography } from '@mui/material';

interface Props {
  component: React.ElementType;
  title: string;
  sx: {
    display?: string;
    marginBottom?: string;
    fontSize?: string;
    paddingLeft?: string;
  };
}

const theme = createTheme({
  typography: {
    fontFamily: "'Dancing Script', cursive",
  },
});

const FontText = ({ component, title, sx }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography component={component} sx={sx}>
        {title}
      </Typography>
    </ThemeProvider>
  );
};

export default FontText;
