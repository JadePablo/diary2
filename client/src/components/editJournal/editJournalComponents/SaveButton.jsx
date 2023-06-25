import React from 'react';
import Button from '@mui/material/Button';

const SaveButton = ({ handleSaveJournalEntry }) => {
  return (
    <Button
      variant="contained"
      color="inherit"
      onClick={handleSaveJournalEntry}
      sx={{
        bgcolor: '#f5f5f5',
        color: 'black',
        borderRadius: '8px',
        marginTop: '1rem', // Add spacing to the top
        '&:hover': {
          bgcolor: 'black',
          color: 'white',
        },
      }}
    >
      Save Journal Entry
    </Button>
  );
};

export default SaveButton;
