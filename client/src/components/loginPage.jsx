import React from "react";
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { handleLoginSuccess } from '../api.js';
import { loginUser } from '../loginReducer.js';
import { useNavigate } from 'react-router-dom';

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
    <div className="App">
      <GoogleLogin
        onSuccess={handleLogin}
      />
    </div>
  );
}

export default Login;
