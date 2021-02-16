import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './components/styles/main.css'
import AuthorizationProvider from "./Context/AuthorizationContext"


ReactDOM.render(
  
    <React.StrictMode>
      {/* <AuthorizationProvider> */}
        <App />
      {/* </AuthorizationProvider> */}
    </React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
