import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
     <AppContextProvider> 
      <GoogleOAuthProvider clientId='325064507422-c89rrh5ajdotaeosen29fnlhkog03ags.apps.googleusercontent.com'>
       <App />
    </GoogleOAuthProvider>
      </AppContextProvider>
  </BrowserRouter>
    
  
);


