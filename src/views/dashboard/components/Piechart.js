import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';

import DashboardCard from '../../../components/shared/DashboardCard';
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
    const seriescolumnchart = [38, 40, 25];

    return (
        <DashboardCard>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={7} sm={7}>
                    <Typography variant="h5">Sản phẩm đã bán</Typography>
                    <Typography variant="h3" fontWeight="700" >
                        <CountUp delay={0.4} end={60000} duration={0.6} />
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                            <IconArrowUpLeft width={20} color="#39B69A" />
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="600">
                            +9%
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            last year
                        </Typography>
                    </Stack>

                </Grid>
                {/* column */}
                <Grid item xs={7} sm={5} >
                    <Typography variant="h5">Người mua</Typography>
                    <Typography variant="h3" fontWeight="700" >
                        <CountUp delay={0.4} end={60000} duration={0.6} />
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                            <IconArrowUpLeft width={20} color="#39B69A" />
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="600">
                            +9%
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            last year
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default YearlyBreakup;
