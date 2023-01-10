import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DatePicker = ({ value, onChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        inputFormat='YYYY/MM/DD'
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        maxDate={dayjs(new Date())}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
