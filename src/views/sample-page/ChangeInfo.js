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
import { func } from 'prop-types'; import { Select } from 'antd';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { Alert, Space, } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { BackTop } from 'antd';
const ReviewList = () => {
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const history = useNavigate()
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
    const loi = ((title, text) => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',
            timer: 1500
        })
    })
    function Update() {

        //password
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
        // if (this.state.matkhau == "") return this.loi("Bạn chưa nhập mật khẩu!")
        // if (!passwordRegex.test(this.state.matkhau)) {
        //     return this.loi('Mật khẩu không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
        // }
        //số điện thoại
        const phoneRegex = /^0\d{9}$/;
        if (phone == "") return loi("Số điện thoại không được để trống")

        if (!phoneRegex.test(phone)) {
            return loi("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
        }
        //họ và tên	
        if (fullname == "") return loi("Bạn chưa nhập họ và tên!")
        if (address == "") return loi("Bạn chưa nhập địa chỉ!")

        const token = getToken();
        if (image != "") {
            const formData = new FormData();
            formData.append("model", image)
            fetch(variable.API_URL + "Account/UpdateAccountCustomer/" + phone + "&" + address + "&" + fullname, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token.value}`
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data == true) {
                        message.success("Thành công")
                        window.location.reload(false)
                    }
                    else {
                        message.error("Thất bại")
                    }

                })
        } else {
            fetch(variable.API_URL + "Account/UpdateAccountCustomer", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
                body: JSON.stringify({
                    phone: phone,
                    address: address,
                    fullName: fullname
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data === "True") {
                        message.success("Thành công")
                        setta(1)
                    }
                })
        }
    }
    const changePass = (() => {

        const token = getToken();
        if (MK == "") return loi("Bạn chưa nhập mật khẩu cũ!");
        if (NewMK == "") return loi("Bạn chưa nhập mật khẩu mới!");
        if (ConfirmMK == "") return loi("Bạn chưa nhập mật khẩu xác thực!");
        if (NewMK != ConfirmMK) return loi("Mật khẩu xác thực không khớp!");
        fetch(variable.API_URL + "Account/ChangePassWord", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                password: MK,
                confirmPassword: ConfirmMK,
                passwordNew: NewMK
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === "Thành công") {
                    message.success("Thành công, mời bạn đăng nhập lại")
                    localStorage.clear()
                    history("/")
                }
                else
                    if (data === "Mật khẩu xác thực không khớp") {
                        message.error("Mật khẩu xác thực không khớp")

                    }
                    else
                        if (data === "Bạn đã nhập sai mật khẩu") {
                            message.error("Bạn đã nhập sai mật khẩu")

                        }
                        else
                            if (data === "Thất bại") {
                                message.error("Thất bại")

                            }
            })
    })
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

    const [MK, setMK] = useState("")
    const [NewMK, SetNewMK] = useState("")
    const [ConfirmMK, setConfirmMK] = useState("")
    return (
        <div style={{ marginLeft: 21, marginTop: 20 }}>
            <PageContainer title="Cài đặt tài khoản" description="this is Sample page" >
                <DashboardCard title="Cài đặt tài khoản">
                    <div hidden>
                        {document.documentElement.scrollTop = 0}
                    </div>
                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Mật khẩu" >
                                    <BackTop />
                                    <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
                                    <div>
                                        <div style={{ padding: -8, }}>
                                            <span style={{ fontWeight: -8 }}>
                                                Mật khẩu cũ
                                            </span>
                                            <input value={MK} onChange={(e) => { setMK(e.target.value) }} type='password' className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Mật khẩu mới
                                            </span>
                                            <input value={NewMK} onChange={(e) => { SetNewMK(e.target.value) }} type='password' className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Xác nhận mật khẩu mới
                                            </span>
                                            <input value={ConfirmMK} onChange={(e) => { setConfirmMK(e.target.value) }} type='password' className='form-control'
                                            />
                                            <div class="modal-footer">
                                                <button type='button' onClick={() => {
                                                    history('/auth/QuenMatKhau')
                                                }} className='btn btn-primary float-start'>Quên mật khẩu</button>
                                                <button onClick={() => {
                                                    changePass()
                                                }} type='button' className='btn btn-primary float-start'>Thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </Grid>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Thông tin cá nhân" >
                                    <div>
                                        <div style={{ padding: 5, }}>
                                            <span style={{ fontWeight: -8 }}>
                                                Email
                                            </span>
                                            <input readOnly type='text' onChange={(e) => { setemail(e.target.value) }} value={email} className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Số điện thoại
                                            </span>
                                            <input type='text' onChange={(e) => { setphone(e.target.value) }} value={phone} className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Địa chỉ
                                            </span>
                                            <input type='text' onChange={(e) => { setaddress(e.target.value) }} value={address} className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Tên người dùng
                                            </span>
                                            <input type='text' onChange={(e) => { setfullname(e.target.value) }} value={fullname} className='form-control'
                                            />
                                            <span style={{ fontWeight: -8 }}>
                                                Ảnh đại diện
                                            </span>
                                            <td>
                                                {image == "" ? <img style={{ width: 50, marginLeft: "367%", marginTop: "5px" }} src={'https://localhost:7067/wwwroot/Image/Avatar/' + Account.avatar} />
                                                    : <img style={{ width: 50, marginLeft: "367%", marginTop: "5px" }} src={URL.createObjectURL(image)} />
                                                }

                                            </td>
                                            <button style={{ float: 'right', borderRadius: "7.25px" }} onClick={() => input.current.click()}>Chọn ảnh </button>
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
