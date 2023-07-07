import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { variable } from '../../../Variable';
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
import { Alert } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
const AuthRegister = ({ title, subtitle, subtext }) => {
    const Forget = () => {
        if (Email == "") return message.error("Bạn chưa nhập Email!")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return message.error('Địa chỉ email không hợp lệ! Vui lòng nhập một địa chỉ email hợp lệ.');
        }

        fetch(variable.API_URL + "Account/ForgotPassword", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: Email,
            })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    loi("Thành công", "Mã xác thực đã được gửi đến địa chỉ email " + Email)
                }
                if (result == "Thất bại, vì tài khoản này chưa được kích hoạt")
                    message.error("Thất bại, vì tài khoản này chưa được kích hoạt")
                if (result == "Email này không khớp với tài khoản nào cả")
                    message.error("Email này không khớp với tài khoản nào cả")
            }, (error) => {
                message.error("Thất bại do lỗi hệ thống")
            }
            )
    }
    const loi = (title, text) => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',

        })
    }
    const [Email, setEmail] = React.useState("");

    return (
        <>

            {
                title ? (
                    <Typography fontWeight="700" variant="h2" mb={1} >
                        {title}
                    </Typography >
                ) : null
            }
            {subtext}
            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Nhập Email của bạn để cấp lại mật khẩu</Typography>
                    <CustomTextField id="email" onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth />
                </Stack>
                <Button onClick={() => Forget()} color="primary" variant="contained" size="large" fullWidth component={Link} >
                    Tiếp theo
                </Button>
            </Box>
            {subtitle}
        </>
    )
}
export default AuthRegister;
