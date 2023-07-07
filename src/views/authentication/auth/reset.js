import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { variable } from '../../../Variable';
import { Space, message } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
import { Alert } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useLocation, useNavigate } from 'react-router';
import 'sweetalert2/src/sweetalert2.scss'
const AuthRegister = ({ title, subtitle, subtext }) => {
    const location = useLocation()
    const history = useNavigate();
    const url1 = new URL(window.location.href);
    const token1 = url1.searchParams.get("Token")
    // .replace(/\s/g, "+");
    const a = queryString.parse(location.search)
    const Forget = () => {
        if (Username == "") return message.error("Bạn chưa nhập tên tài khoản!")
        const usernameRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;
        if (!usernameRegex.test(Username))
            return message.error(" Vui lòng nhập tên tài khoản có ít nhất 5 ký tự (không dùng tiếng việt có dấu) và ít nhất 1 chữ viết hoa.")
        if (Password != ConfirmPassword) return message.error('Mật khẩu xác thực không khớp')
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
        if (Password == "") return message.error("Bạn chưa nhập mật khẩu!")
        if (!passwordRegex.test(Password))
            return message.error('Mật khẩu không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
        if (token1 == null) return message.error("Đã xảy ra lỗi")
        if (Email == null) return message.error("Đã xảy ra lỗi")
        fetch(variable.API_URL + "Account/ResetPassWord", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserName: Username,
                Password: Password,
                ConfirmPassword: ConfirmPassword,
                Token: token1.replace(/\s/g, "+"),
                email: Email,
            })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công, mời bạn đăng nhập")
                    history("/")
                }
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
    const [Email, setEmail] = React.useState(() => {
        const a = queryString.parse(location.search)
        return a.Email
    });
    const [Token, setToken] = React.useState(() => {
        const a = queryString.parse(location.search)
        return a.Token
    });
    const [Username, setUsername] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [ConfirmPassword, setConfirmPassword] = React.useState("");

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
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">UserName</Typography>
                    <CustomTextField id="email" onChange={(e) => setUsername(e.target.value)} variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Mật khẩu</Typography>
                    <CustomTextField id="email" onChange={(e) => setPassword(e.target.value)} variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Mật khẩu xác thực</Typography>
                    <CustomTextField id="email" onChange={(e) => setConfirmPassword(e.target.value)} variant="outlined" fullWidth />
                </Stack>
                <Button onClick={() => Forget()} color="primary" variant="contained" size="large" fullWidth component={Link} >
                    Thay đổi
                </Button>
            </Box>
            {subtitle}
        </>
    )
}
export default AuthRegister;
