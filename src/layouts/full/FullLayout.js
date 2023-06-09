import React, { useEffect, useState } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import jwt_decode from "jwt-decode";
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import { lazy } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    return (
      // <MainWrapper
      //   className='mainwrapper'
      // >
      //   {/* ------------------------------------------- */}
      //   {/* Sidebar */}
      //   {/* ------------------------------------------- */}
      //     <Sidebar isSidebarOpen={isSidebarOpen}
      //       isMobileSidebarOpen={isMobileSidebarOpen}
      //       onSidebarClose={() => setMobileSidebarOpen(false)} />
      //   {/* ------------------------------------------- */}
      //   {/* Main Wrapper */}
      //   {/* ------------------------------------------- */}
      //   <PageWrapper
      //     className="page-wrapper"
      //   >
      //     {/* ------------------------------------------- */}
      //     {/* Header */}
      //     {/* ------------------------------------------- */}
      //     <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      //     {/* ------------------------------------------- */}
      //     {/* PageContent */}
      //     {/* ------------------------------------------- */}
      //     <Container sx={{
      //       paddingTop: "20px",
      //       maxWidth: '1200px',
      //     }}
      //     >
      //       {/* ------------------------------------------- */}
      //       {/* Page Route */}
      //       {/* ------------------------------------------- */}
      //       <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
      //         <Outlet />
      //       </Box>
      //       {/* ------------------------------------------- */}
      //       {/* End Page */}
      //       {/* ------------------------------------------- */}
      //     </Container>
      //   </PageWrapper>
      // </MainWrapper>
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
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                <Outlet />
              </Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </Container>
          </Box>
        </Box>

      </>
    ); 
};

export default FullLayout;
