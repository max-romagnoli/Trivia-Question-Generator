import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* Add config here */
// export const BACKEND_ADDRESS = "http://127.0.0.1:5000"                       // THIS FOR DEVELOPMENT
export const BACKEND_ADDRESS = "https://group-16-9bd3630a5775.herokuapp.com"     // THIS FOR DEPLOYMENT

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
