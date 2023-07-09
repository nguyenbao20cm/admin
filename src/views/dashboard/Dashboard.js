
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Doanhthu from './components/Doanhthu';
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import Chiphithangnay from './components/Chiphithangnay';
import PieChart from './components/Piechart';
import PieChart1 from './components/Piechart1';
import React from 'react';
import DashboardCard from '../../components/shared/DashboardCard1';
import { Card, CardContent, Typography, Stack, CardActionArea } from '@mui/material';
import { BackTop } from 'antd';
const Dashboard = () => {
  const namhientai = new Date().getFullYear()
  return (
    <PageContainer title="Trang chủ" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} >
            {/* <SalesOverview /> */}
            <Card sx={{ boxShadow: "none" }}>
              <CardContent >
                <div style={{ marginTop: 30, marginLeft: 30, padding: 10 }}>
                  <PieChart />
                </div>
                <div style={{ marginTop: 30, marginLeft: 30, padding: 10 }}>
                  <PieChart1 />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <Doanhthu />
              </Grid>
              <Grid item xs={12} >
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            {/* <Blog /> */}
          </Grid>
        </Grid>
      </Box>
      <BackTop />
      <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
    </PageContainer>
  );
};

export default Dashboard;
