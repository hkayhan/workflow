import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
// import Login from "./pages/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<Login />*/}
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>
);

