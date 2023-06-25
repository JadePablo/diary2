import React from 'react';
import TextField from '@mui/material/TextField';

const TitleInput = ({ title, handleTitleChange }) => {
  return (
    <TextField
      label="Title"
      value={title}
      onChange={handleTitleChange}
      fullWidth
    />
  );
};

export default TitleInput;
