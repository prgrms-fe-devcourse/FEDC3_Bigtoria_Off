import 'dayjs/locale/ko';

import { createTheme, TextField, ThemeProvider } from '@mui/material';
import {
  koKR,
  LocalizationProvider,
  MobileDatePicker,
  PickersDay,
  pickersDayClasses,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { COLORS } from '../../constants/colors';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const renderWeekPickerDay = (
  date: Dayjs,
  selectedDates: Array<Dayjs | null>,
  pickersDayProps: PickersDayProps<Dayjs>
) => {
  return (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: COLORS.SUB,
        },
      }}
    />
  );
};

const DatePicker = ({ value, onChange }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale='ko'
        localeText={
          koKR.components.MuiLocalizationProvider.defaultProps.localeText
        }>
        <MobileDatePicker
          inputFormat='YYYY년 M월 D일'
          label='날짜'
          value={value}
          toolbarFormat='YYYY년 M월 D일'
          onChange={onChange}
          disableMaskedInput
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} color='warning' />}
          maxDate={dayjs(new Date())}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DatePicker;

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: `${COLORS.SUB}`,
        },
      },
    },
  },
});
