import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import jwt_decode from "jwt-decode";
import { baselightTheme } from "./theme/DefaultColors";
import Loadable from './layouts/full/shared/loadable/Loadable';
import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const Login = Loadable(lazy(() => import('./views/authentication/Login.js')));

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken == null) return null;
    const now = new Date()
    if (now >= userToken.expiry) {
      localStorage.clear()
      message.error("Đăng nhập đã hết hạn")
      return null
    }
    return tokenString
  }
  const token = getToken();
  if (token == null) {
    return <Login />
  }

  const decoded = jwt_decode(token);
  if (decoded.RoleUser == "Admin")
    return (
      <ThemeProvider theme={theme}>

        <CssBaseline />
        {routing}

      </ThemeProvider>
    );
  else
    return <Login />
}

export default App;
