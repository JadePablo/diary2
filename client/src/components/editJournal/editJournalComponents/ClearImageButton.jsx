import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const ClearImageButton = ({ handleClearImage, image }) => {
  return (
    <Grid item xs={12} sx={{ textAlign: 'center' }}>
      {image && (
        <img
          src={image}
          alt="Uploaded Image"
          style={{ height: '200px', width: '100%', objectFit: 'cover' }}
        />
      )}
      <Button
        variant="contained"
        color="inherit"
        onClick={handleClearImage}
        sx={{
          bgcolor: '#f5f5f5', // Lighter gray background color
          color: 'black', // Dark shade of gray for the text
          borderRadius: '8px', // Rounded corners
          marginTop: '1rem', // Add spacing to the top
          '&:hover': {
            bgcolor: 'black', // Black background color on hover
            color: 'white', // White text color on hover
          },
        }}
      >
        Clear Image
      </Button>
    </Grid>
  );
};

export default ClearImageButton;
