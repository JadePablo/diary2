import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';

function Content({ handleLogin }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        diario
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        It's a diary, literally.
      </Typography>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Times New Roman',
        }}
      >
        <GoogleLogin onSuccess={handleLogin} />
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          It was that or diaria pronounced: dai - ur -ee -uh.
        </Typography>
      </Box>
    </Box>
  );
}

export default Content;
