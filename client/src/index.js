import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from '@react-oauth/google';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {disablereactDevTools} from '@fvilers/disable-react-devtools'

import loginReducer from './loginReducer.js';


if (process.env.NODE_ENV === 'production') disablereactDevTools()

const store = configureStore({
  reducer: {
    login: loginReducer
  },
  devTools: false
})

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>   
      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
