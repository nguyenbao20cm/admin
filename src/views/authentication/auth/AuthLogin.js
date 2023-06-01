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
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {

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
            expiry: now.getDay() + 7,
        }

        localStorage.setItem('token', JSON.stringify(item));
    }
    const Login = () => {

        if (username == "") return alert("Nhập Username");
        if (password == "") return alert("Nhập Password");

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
                if (result == "Failed") alert("Failed");
                if (result != "Failed") {
                    setToken(result);
                    window.location.reload(false);
                }
            }, (error) => {
                alert("Failed");
            }
            )
    }
    return (
        <>
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
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth
                    onChange={(e) => ChangePass(e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remeber this Device"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    to="/"
                    type="submit"
                    onClick={() => Login()}
                >
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </>
    )
};

export default AuthLogin;
