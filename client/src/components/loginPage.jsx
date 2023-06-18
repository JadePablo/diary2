import React from "react";
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'grey',
        padding: '20px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Diario
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Literally just a diary.
      </Typography>
      <Box
        sx={{
          outline: '4px solid grey',
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
      <Typography variant="caption" color="text.secondary" mt={2}>
        It was that or diarryea pronounced: dai - ur -ee -uh.
      </Typography>
    </Box>
  );
}

export default Login;
