import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';
import { useEffect } from 'react';
import { variable } from '../../../Variable';
import DashboardCard from '../../../components/shared/DashboardCard1';
import "../components/style.css"
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import CountUp from 'react-countup';
const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      width: 380,
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 200,

    },
    labels: ["2022", "2023", "2021"],
    // colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '60%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [15, 6, 7];
  var [TotalYear, setTotalYear] = React.useState(0);
  var [TotalYearAgo, setTotalYearAgo] = React.useState(0);
  let year = new Date();
  const getToken = (() => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  })
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  useEffect(() => {

    const token = getToken();
    fetch(variable.API_URL + "Inovices/ProfitForyear/" + year.getFullYear(), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setTotalYear(data)
      })

    fetch(variable.API_URL + "Inovices/ProfitForYearAgo/" + year.getFullYear() - 1, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setTotalYearAgo(data)
      })
  }, []);
  var abc = new Date()
  const errorlight = '#fdede8';
  var nam = "Lợi nhuận năm " + abc.getFullYear()
  return (
    <DashboardCard title={nam}>
      <Grid container spacing={3}>

        {/* column */}
        <Grid item xs={9} sm={9}>
          <Typography variant="h5" fontWeight="700" alignContent={'center'}>
            <CountUp delay={0.4} end={TotalYear} duration={0.6} /> Đồng
          </Typography>
          {abc.getFullYear() == 2021 ? null :
            <>
              {
                TotalYear == "" || TotalYearAgo == "" ? null :
                  <Stack direction="row" alignItems="center">
                    {((TotalYearAgo - TotalYear) / TotalYear) * 100 < 0 ?
                      <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                        <IconArrowDownRight width={20} color="#FA896B" />
                      </Avatar> : <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                        <IconArrowUpLeft width={20} color="#39B69A" />
                      </Avatar>
                    }
                    <Typography marginLeft="7px" variant="subtitle2" fontWeight="600" >

                      {TotalYear == "" || TotalYearAgo == "" ? null : ((TotalYearAgo - TotalYear) / TotalYear) * 100}%
                    </Typography>
                    <Typography marginLeft="7px" variant="subtitle2" color="textSecondary">
                      so với năm trước
                    </Typography>
                  </Stack>
              }
            </>
          }
          {/* <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2022
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2023
              </Typography>
            </Stack>
          </Stack> */}
        </Grid>
        {/* column */}


        {/* <div className='ChartPie'>
          <Grid item xs={7} sm={7} >
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height="900px"
            />
          </Grid>
        </div> */}
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
