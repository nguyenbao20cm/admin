// import React from 'react';
// import { Typography } from '@mui/material';
// import PageContainer from 'src/components/container/PageContainer';
// import DashboardCard from '../../components/shared/DashboardCard';

// import ReportWeek from "../ReportWeek/ReportWeekCRUD"
// const SamplePage = () => {
//     return (
//         <PageContainer title="Sample Page" description="this is Sample page">

//             <DashboardCard title="Danh sách sản phẩm ">
//                 <Typography paragraph>
//                     <ReportWeek />
//                 </Typography>
//             </DashboardCard>
//         </PageContainer>
//     );
// };

// export default SamplePage;
import { BackTop } from 'antd';
import React from 'react';
import { Select, MenuItem, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useEffect } from 'react';
import { variable } from '../../Variable';
import { parseNonNullablePickerDate } from '@mui/x-date-pickers/internals';
import { Stack, Typography, Avatar } from '@mui/material';
const SalesOverview = () => {

    // select
    let year = new Date();
    const [month, setMonth] = React.useState(year.getFullYear());
    var [Vanchuyen, setVanchuyen] = React.useState([]);
    var [InvoiceTotalMonth, setInvoiceTotalMonth] = React.useState([]);
    var [ImportPrice, setImportPrice] = React.useState([]);
    var [loinhuan, setloinhuan] = React.useState([]);
    const handleChange = (event) => {
        setMonth(event.target.value);
    };
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "Inovices/GetAllInoviceTotalMonth/" + month, {
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

        fetch(variable.API_URL + "ProductSizes/GetAllImportPrice/" + month, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setImportPrice(data)
            })

        fetch(variable.API_URL + "Inovices/GetProfit/" + month, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setloinhuan(data)
            })
        fetch(variable.API_URL + "Inovices/GetPhiVanChuyen/" + month, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setVanchuyen(data)
            })
    }, [month]);


    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const thir = theme.palette.success.dark;
    const four = theme.palette.success.main;
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary, thir, four],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return VND.format(val)
                }
            }
        },
        xaxis: {
            categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Thu nhập trong tháng',
            data: Object.values(InvoiceTotalMonth)
        },
        {
            name: 'Chi tiêu trong tháng',
            data: Object.values(ImportPrice)
        },
        {
            name: 'Lợi nhuận trong tháng',
            data: Object.values(loinhuan)
        },
        {
            name: 'Chi phí giao hàng trong tháng',
            data: Object.values(Vanchuyen)
        },
    ];



    return (
        <>

            {InvoiceTotalMonth != null ?
                <DashboardCard height="670" title="Sơ đồ tổng quan" action={
                    <div>
                        <Select
                            labelId="month-dd"
                            id="month-dd"
                            value={month}
                            size="small"
                            onChange={handleChange}
                            style={{ margintop: '-32px', }}
                        >
                            <MenuItem value={2023}> 2023</MenuItem>
                            <MenuItem value={2022}> 2022</MenuItem>
                            <MenuItem value={2021}> 2021</MenuItem>
                        </Select>
                        <Container style={{ height: "6px", }}></Container>
                        <Avatar
                            sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Thu nhập
                        </Typography>
                        <Avatar
                            sx={{ width: 9, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Chi tiêu
                        </Typography>
                        <Avatar
                            sx={{ width: 9, height: 9, bgcolor: thir, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Lợi nhuận
                        </Typography>
                        <Avatar
                            sx={{ width: 9, height: 9, bgcolor: four, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Chi phí giao hàng
                        </Typography>
                    </div>
                }>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="bar"
                        height="445px"
                    />
                    <BackTop />
                    <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
                </DashboardCard>
                : null
            }
        </>
    );
};

export default SalesOverview;
