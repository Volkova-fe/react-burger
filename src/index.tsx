import React from 'react';
import ReactDOM from 'react-dom/client';
import './vendors/normalize.module.css';
import './pages/index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
