import React from "react";

//imports from dependencies
import Box from '@mui/material/Box';

//helper functions for authentication
import { useHandleLogin } from "./loginHelper.js";

//sub components for the login page
import Header from './loginComponents/Header.jsx'
import Content from './loginComponents/Content.jsx'

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
      <Header/> 
      <Content handleLogin={handleLogin}/>

    </Box>
  );
}

export default Login;
