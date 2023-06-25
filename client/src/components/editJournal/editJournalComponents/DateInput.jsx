import React from 'react';
import TextField from '@mui/material/TextField';

const DateInput = ({ openDate, handleDateChange }) => {
  return (
    <TextField
      type="date"
      value={openDate}
      onChange={(e) => handleDateChange(e.target.value)}
      fullWidth
    />
  );
};

export default DateInput;
