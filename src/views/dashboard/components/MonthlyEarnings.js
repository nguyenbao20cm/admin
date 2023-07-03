import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Container } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard1';
import { useEffect } from 'react';
import { variable } from '../../../Variable';
import CountUp from 'react-countup';
const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const getToken = (() => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  })
  var [Moth, setInvoiceTotalMonth] = React.useState(0);

  useEffect(() => {
    const abc = new Date()
    var month = abc.getMonth() + 1;
    var year = abc.getFullYear()
    const token = getToken();
    fetch(variable.API_URL + "ProductSizes/GetImportDayAllYear/" + year, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setInvoiceTotalMonth(data)
      })
  }, []);
  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 500,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },

    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },

    labels: [25, 66, 20, 40, 12, 58, 20],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: 'Lợi nhuận',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },

  ];
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const abc = new Date()
  const a = "Chi phí nhập " + abc.getFullYear()
  return (
    <DashboardCard
      title={a}
    // action={
    //   <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
    //     <IconCurrencyDollar width={24} />
    //   </Fab>
    // }

    // footer={
    //   // <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="69px" />
    //   <div style={{ height: "58px" }}>

    //   </div>
    // }
    >
      <>
        <Typography variant="h5" fontWeight="700" mt="-20px" style={{ marginTop: "5px" }}>
       
          <CountUp delay={0.4} end={Moth} duration={0.6} /> Đồng
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            so với tháng trước
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
