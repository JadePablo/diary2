import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { handleLoginSuccess } from '../api.js';
import { loginUser } from '../loginReducer.js';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function useHandleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(credentialResponse) {
    try {
      const result = await handleLoginSuccess(credentialResponse);
      // Perform additional actions after successful login
      dispatch(loginUser({ email: result.email, name: result.name }));
      if (result) {
        navigate(`/homepage/${encodeURIComponent(result.name)}`); // Navigate to the '/homepage' route
      }
    } catch (error) {
      console.log('Login Failed:', error);
    }
  }

  return handleLogin;
}

function Login() {
  const handleLogin = useHandleLogin();
  const [showText, setShowText] = useState(false);

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Diario
        </Typography>

      </Box>
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
        <GoogleLogin
          onSuccess={handleLogin}
        />
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          It was that or diarryea pronounced: dai - ur -ee -uh.
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
