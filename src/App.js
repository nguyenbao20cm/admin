import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from "./theme/DefaultColors";
import Loadable from './layouts/full/shared/loadable/Loadable';
import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const Login = Loadable(lazy(() => import('./views/authentication/Login.js')));

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken == null) return null;
    const now = new Date()
    if (now.getDate() > userToken.expiry) {
      localStorage.clear()
      return null
    }
    return userToken
  }
  const token = getToken();
  if (token == null) {
    return <Login />
  }
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}

    </ThemeProvider>
  );
}

export default App;
