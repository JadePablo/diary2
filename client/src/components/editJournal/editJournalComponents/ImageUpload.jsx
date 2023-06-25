import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'

const ImageUpload = ({ handleImageUpload }) => {
  return (
    <Grid item xs={12} sx={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button
          component="span"
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: '#f5f5f5', // Lighter gray background color
            color: 'black', // Dark shade of gray for the text
            borderRadius: '8px', // Rounded corners
            '&:hover': {
              bgcolor: 'black', // Black background color on hover
              color: 'white', // White text color on hover
            },
          }}
        >
          Upload Image
        </Button>
      </label>
      </Grid>
  );
};

export default ImageUpload;
