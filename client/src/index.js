import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './components/styles/main.css'
import AuthProvider from "./Context/AuthorizationContext"


ReactDOM.render(
  
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
