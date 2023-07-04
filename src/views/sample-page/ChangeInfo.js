import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard1';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { variable } from '../../Variable';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { func } from 'prop-types';
import { message } from 'antd';
const ReviewList = () => {
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const input = useRef(null)
    var [ta, setta] = React.useState(0);
    var [Account, setAccount] = React.useState([]);
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "Account/GetDetailAccount", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setAccount(data)
                setemail(data.email)
                setavatar(data.avatar)
                setphone(data.phone)
                setfullname(data.fullName)
                setaddress(data.address)
            })
    }, [ta]);
    function Update() {
        const token = getToken();
        fetch(variable.API_URL + "Account/UpdateAccountCustomer", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body:
                JSON.stringify({
                    email: email,
                    phone: phone,
                    address: address,
                    fullName: fullname
                })
        })
            .then(response => response.json())
            .then(data => {
                if (data == "True") {
                    if (image != "") {
                        const formData = new FormData();
                        formData.append("model", image, Account.username)
                        fetch(variable.API_URL + "Account/CreateAvatarImage", {
                            method: "POST",
                            body: formData
                        }).then(res => res.json())
                    }
                    setta(1)
                    message.success("Thành công")
                }
                else
                    message.error("Đã xảy ra lỗi")
            })
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const ImgUp = ((event) => {
        if (event.target.files[0] != null)
            setimage(event.target.files[0])
    })
    const [image, setimage] = useState("")
    const [email, setemail] = useState("")
    const [avatar, setavatar] = useState("")
    const [phone, setphone] = useState("")
    const [fullname, setfullname] = useState("")
    const [address, setaddress] = useState("")
    return (
        <div style={{ marginLeft: 21, marginTop: 20 }}>
            <PageContainer title="Cài đặt tài khoản" description="this is Sample page" >
                <DashboardCard title="Cài đặt tài khoản">
                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Mật khẩu" >
                                    <div>
                                        <div style={{ padding: 5, }}>
                                            <span >
                                                Mật khẩu cũ
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Mật khẩu mới
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Xác nhận mật khẩu mới
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <div class="modal-footer">
                                                <button type='button' className='btn btn-primary float-start'>Thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </Grid>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Thông tin cá nhân" >
                                    <div>
                                        <div style={{ padding: 5, }}>
                                            <span >
                                                Email
                                            </span>
                                            <input type='text' onChange={(e) => { setemail(e.target.value) }} value={email} className='form-control'
                                            />
                                            <span >
                                                Số điện thoại
                                            </span>
                                            <input type='text' onChange={(e) => { setphone(e.target.value) }} value={phone} className='form-control'
                                            />
                                            <span >
                                                Địa chỉ
                                            </span>
                                            <input type='text' onChange={(e) => { setaddress(e.target.value) }} value={address} className='form-control'
                                            />
                                            <span >
                                                Tên người dùng
                                            </span>
                                            <input type='text' onChange={(e) => { setfullname(e.target.value) }} value={fullname} className='form-control'
                                            />
                                            <span >
                                                Ảnh đại diện
                                            </span>
                                            <td>
                                                {image == "" ? <img style={{ width: 50, marginLeft: "367%", marginTop: "5px" }} src={'https://localhost:7067/wwwroot/Image/Avatar/' + Account.avatar} />
                                                    : <img style={{ width: 50, marginLeft: "367%", marginTop: "5px" }} src={URL.createObjectURL(image)} />
                                                }

                                            </td>
                                            <button style={{ float: 'right', borderRadius: "7.25px" }} onClick={() => input.current.click()}>Thay đổi </button>
                                            <br></br>
                                            <input onChange={(e) => ImgUp(e)} hidden ref={input} type='file' className='form-control'
                                            />
                                            <div style={{ float: 'right', padding: 10 }}>
                                                <button type='button' onClick={() => Update()} className='btn btn-primary float-start'>Cập nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </Grid>

                        </Grid>
                    </Box>
                </DashboardCard>
            </PageContainer>
        </div >
    );
};
export default ReviewList;
