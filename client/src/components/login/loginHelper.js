import { useDispatch } from 'react-redux';

import { handleLoginSuccess,updateOnlineStatus } from "../../api.js";
import { loginUser } from '../../loginReducer.js';
import { useNavigate } from 'react-router-dom';

export function useHandleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(credentialResponse) {
    try {
      const result = await handleLoginSuccess(credentialResponse);
      // Perform additional actions after successful login
      dispatch(loginUser({ email: result.email, name: result.name }));
      if (result) {
        await updateOnlineStatus(result.email);
        navigate(`/homepage/${encodeURIComponent(result.name)}`); // Navigate to the '/homepage' route
      }
    } catch (error) {
      console.log('Login Failed:', error);
    }
  }

  return handleLogin;
}
