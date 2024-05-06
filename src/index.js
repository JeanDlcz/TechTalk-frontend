import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={ <App/> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
