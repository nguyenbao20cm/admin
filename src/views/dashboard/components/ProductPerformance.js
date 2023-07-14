import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard1';
import { useEffect } from 'react';
import { variable } from '../../../Variable';
import CountUp from 'react-countup';


const ProductPerformance = () => {

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    var [products, setInvoiceTotalMonth] = React.useState([]);

    useEffect(() => {
        const abc = new Date()
        var month = abc.getMonth() + 1;
        var year = abc.getFullYear()
        const token = getToken();
        fetch(variable.API_URL + "Products/GetTop10BestSeller", {
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
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <DashboardCard title="Các sản phẩm bán chạy">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    SKU
                                </Typography>
                            </TableCell> */}
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tên
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Số lượt bán
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ảnh
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Giá
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(0, 8).map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                {/* <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.sku}
                                    </Typography>
                                </TableCell> */}
                                <TableCell align="inherit">
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            // backgroundColor: product.pbg,
                                            // color: "#fff",
                                        }}
                                        size="small"
                                        label={product.countSell}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="left">
                                    <img style={{ width: 50 }} src={'https://localhost:7067/wwwroot/Image/Product/' + product.image} />
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="h6">
                                        <CountUp delay={0.4} end={product.price} duration={0.6} /> Đồng
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
