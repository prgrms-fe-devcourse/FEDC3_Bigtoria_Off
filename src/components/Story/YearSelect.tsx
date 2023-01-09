import NativeSelect from '@mui/material/NativeSelect';
import { useMemo } from 'react';

const currentYear = new Date().getFullYear();
const yearNumber = 50;

const YearInput = () => {
  const yearList = useMemo(() => {
    return Array.from(
      { length: yearNumber },
      (_, index) => currentYear - index
    );
  }, []);

  return (
    <NativeSelect defaultValue={currentYear}>
      {yearList &&
        yearList.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
    </NativeSelect>
  );
};

export default YearInput;
