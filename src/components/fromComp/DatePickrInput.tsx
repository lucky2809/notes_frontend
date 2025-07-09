import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DatePickerInputProps = {
  value?: string | Dayjs | null; // supports string, Dayjs, or null
  setValue: (date: Dayjs | any) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, setValue }) => {
  const parsedValue = value ? dayjs(value) : dayjs('2020-01-01'); // default if null/undefined

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date of Birth"
          value={parsedValue}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: { size: 'small', sx: { width: 900 } },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerInput;
