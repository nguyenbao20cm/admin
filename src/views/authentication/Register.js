import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';




import { lazy } from 'react'; import Loadable from '../../layouts/full/shared/loadable/Loadable';


import AuthLogin from './auth/AuthLogin';
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'

import { Outlet } from 'react-router-dom';
import { styled, Container, } from '@mui/material';
import Header from '../../layouts/full/header/Header';
import Sidebar from '../../layouts/full/sidebar/Sidebar';
const Register2 = () => {
  const input = React.useRef(null)
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
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const token = getToken();
  if (token == null)
    return (
      <PageContainer title="Register" description="this is Register page">
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
                <AuthRegister
                  subtext={
                    <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                      Your Social Campaigns
                    </Typography>
                  }
                  subtitle={
                    <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        Already have an Account?
                      </Typography>
                      <Typography
                        component={Link}
                        to="/auth/login"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Sign In
                      </Typography>
                    </Stack>
                  }
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    )
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
}

export default Register2;
