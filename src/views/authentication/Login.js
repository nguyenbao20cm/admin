import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import { lazy } from 'react'; import Loadable from '../../layouts/full/shared/loadable/Loadable';
// components
import { variable } from '../../Variable';
import queryString from 'query-string';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, Container, } from '@mui/material';
import Header from '../../layouts/full/header/Header';
import Sidebar from '../../layouts/full/sidebar/Sidebar';
const Login2 = () => {
  const url1 = new URL(window.location.href);
  // const token1 = url1.searchParams.get("Token").replace(/\s/g, "+");
  const Dashboard = Loadable(lazy(() => import('../../views/dashboard/Dashboard')))
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
  const [Email, setEmail] = React.useState(() => {
    const url1 = new URL(window.location.href);
    if (url1 != null)
      return url1.searchParams.get("Email")
  });
  const [Token, setToken] = React.useState(() => {
    const url1 = new URL(window.location.href);
    if (url1 != null)
      return url1.searchParams.get("Token")
  });
  useEffect(() => {
    if (Token != null && Email != null) {
      fetch(variable.API_URL + "Account/ConfirmEmail", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: Token.toString().replace(/\s/g, "+"),
          email: Email,
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data == "Thành công")
            message.success("Thành công, bạn đã có thể đăng nhập")
        })
    }
  }, []);

  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const token = getToken();
  if (token == null)
    return (
      <PageContainer title="Login" description="this is Login page">
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <AuthLogin
                  subtext={
                    <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>

                    </Typography>
                  }
                // subtitle={
                //   <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                //     <Typography color="textSecondary" variant="h6" fontWeight="500">
                //     </Typography>
                //     <Typography
                //       component={Link}
                //       to="/auth/QuenMatKhau"
                //       fontWeight="500"
                //       sx={{
                //         textDecoration: 'none',
                //         color: 'primary.main',
                //       }}
                //     >
                //       Quên mật khẩu
                //     </Typography>
                //   </Stack>
                // }
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    );
  else
    return (
      <>
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Box sx={{ display: 'flex' }}>
          <Sidebar isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
          >

            <Container sx={{
              paddingTop: "20px",
              maxWidth: '1200px',
            }}
            >
              <Dashboard />
            </Container>
          </Box>
        </Box>
      </>
    )
};

export default Login2;
