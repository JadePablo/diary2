import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ text, handleTextChange }) => {
  return (
    <TextField
      label="Write here."
      value={text}
      onChange={handleTextChange}
      fullWidth
      multiline
      rows={4}
    />
  );
};

export default TextInput;
