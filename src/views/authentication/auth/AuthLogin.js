import React from 'react';
import { useState } from 'react'
import { variable } from '../../../Variable';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Alert, Space, message } from 'antd';
const AuthLogin = ({ title, subtitle, subtext }) => {
    const history = useNavigate();


    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const ChangeName = (value) => {
        setusername(value)
    }
    const ChangePass = (value) => {
        setpassword(value)
    }
    function setToken(userToken) {
        const now = new Date()
        const item = {
            value: userToken,
            expiry: addDays(now, 7),
        }

        localStorage.setItem('token', JSON.stringify(item));
    }
    function addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }
    const Login = () => {
        if (username == "" && password == "") return setTimeout(() => {
            message.error("Tên đăng nhập và mật khẩu không hợp lệ")
        }, 0);
        if (username == "") return setTimeout(() => {
            message.error("Tên đăng nhập đang trống")
        }, 0);
        if (password == "") return setTimeout(() => {
            message.error("Mật khẩu đang trống")
        }, 0);

        fetch(variable.API_URL + "Account/Signin", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        }).then(res => res.json())
            .then(result => {
                if (result == "Failed") setTimeout(() => {
                    message.error("Đăng nhập thất bại")
                    setusername(username)
                    setpassword("")
                }, 0);
                if (result == "Chưa xác minh Email") setTimeout(() => {
                    message.error("Bạn chưa xác minh Email")
                    setusername(username)
                    setpassword("")
                }, 0);
                else if (result != "Failed") {
                    setToken(result);
                    const tokenString = localStorage.getItem('token');
                    const decoded = jwt_decode(tokenString);
                    if (decoded.RoleUser == "Admin") {
                        setTimeout(() => {
                            message.success("Đăng nhập thành công")
                        }, 0);
                        history('/dashboard')


                    }
                    else
                        setTimeout(() => {
                            message.error("Đăng nhập thất bại")
                            setusername(username)
                            setpassword("")
                        }, 0);
                }
            }, (error) => {
                setTimeout(() => {
                    message.error("Đăng nhập thất bại")
                    setusername(username)
                    setpassword("")
                }, 0);
            }
            )
    }
    return (
        <>
            {/* <Space direction="vertical" style={{ width: '100%' }}>
                <Alert message="Success Tips" type="success" showIcon />
                <Alert message="Informational Notes" type="info" showIcon />
                <Alert message="Warning" type="warning" showIcon closable />
                <Alert message="Error" type="error" showIcon />
                <Alert
                    message="Success Tips"
                    description="Detailed description and advice about successful copywriting."
                    type="success"
                    showIcon
                />
                <Alert
                    message="Informational Notes"
                    description="Additional description and information about copywriting."
                    type="info"
                    showIcon
                />
                <Alert
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                    showIcon
                    closable
                />
                <Alert
                    message="Error"
                    description="This is an error message about copywriting."
                    type="error"
                    showIcon
                />
            </Space> */}
            {
                title ? (
                    <Typography fontWeight="700" variant="h2" mb={1} >
                        {title}
                    </Typography >
                ) : null}
            {subtext}
            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                    <CustomTextField id="username" variant="outlined" fullWidth
                        onChange={(e) => ChangeName(e.target.value)}
                    />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password}
                        onChange={(e) => ChangePass(e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        {/* <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remeber this Device"
                        /> */}
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/auth/QuenMatKhau"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                        style={{ float: 'right' }}
                    >
                        Quên mật khẩu
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth

                    onClick={() => Login()}
                >
                    Đăng nhập
                </Button>
            </Box>
            {subtitle}
        </>
    )
};

export default AuthLogin;
