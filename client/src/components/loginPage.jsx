import React from "react";
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { handleLoginSuccess, updateOnlineStatus } from '../api.js';
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
        await updateOnlineStatus(result.email)
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
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '10px',
          backgroundColor: 'white',
          fontFamily: 'Arial',
        }}
      >
      <Typography variant="caption" color="black" sx={{ fontSize: '24px'}}>
        <b><i>why?</i></b>
      </Typography>
      <Typography variant="caption" color="black" sx={{ fontSize: '12px'}}>
        <br />
        <i>lock your thoughts and unlock your potential.</i> ok rapid fire features here we go.
        set a lock time for journal entries until a specified date.
        on new year's eve we'll share insight into what/who you talk about the most. and what emotions tend
        to spill in your entries using machine learning. And that is the only time we will bother you via email.

        <b>and most importantly, your data is <s>compromised</s> secure. That was a joke. I promise its secure.</b>
      </Typography>

      </Box>
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
            It was that or diarryea pronounced: dai - ur -ee -uh.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
