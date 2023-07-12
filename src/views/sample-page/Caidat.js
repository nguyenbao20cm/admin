import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { useEffect } from 'react';
import {
    ListItemIcon,
    ListItem,
    List,

    ListItemText,
    useTheme
} from '@mui/material'; import { BackTop } from 'antd';
import { useRef, useState } from 'react';
import { variable } from '../../Variable';
import { message } from 'antd';
import { Alert, Space, } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
const ReviewList = () => {
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const [data, setdata] = useState([])
    const [time, settime] = useState(0)
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "Footer/GetFooter", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                {
                    setdata(data)
                    settitle(data.title)
                    setphone(data.phone)
                    setadress(data.adress)
                    setemail(data.email)
                    setlinkFacebook(data.linkFacebook)
                    setlinkInstagram(data.linkInstagram)
                    setlinkZalo(data.linkZalo)
                }
            })
    }, [time]);
    const theme = useTheme();
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [phone, setphone] = useState("")
    const [adress, setadress] = useState("")
    const [email, setemail] = useState("")
    const [linkZalo, setlinkZalo] = useState("")
    const [linkInstagram, setlinkInstagram] = useState("")
    const [linkFacebook, setlinkFacebook] = useState("")

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const input = useRef(null)
    const ImgUp = ((event) => {
        if (event.target.files[0] != null)
            setimage(event.target.files[0])
    })
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
    const Update = (() => {
        const token = getToken();
        if (title == "") return loi("Tên trang web bị rỗng ", "Hãy nhập lại")
        if (adress == "") return loi("Địa chỉ bị rỗng ", "Hãy nhập lại")
        if (email == "") return loi("Địa chỉ bị rỗng ", "Hãy nhập lại")
        if (phone == "") return loi("Điện thoại bị rỗng ", "Hãy nhập lại")
        if (phone.length != 10) return loi("Điện thoại không hợp lệ", "Hãy nhập lại")
        if (Number.isInteger(phone) || Number(phone) < 0) return loi("Số diện thoại không hợp lệ", "Hãy xem lại dư liệu nhập")

        fetch(variable.API_URL + "Footer/UpdateFooter/" + data.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                title: title,
                avatar: "1.jpg",
                phone: phone,
                adress: adress,
                email: email,
                linkFacebook: linkFacebook,
                linkInstagram: linkInstagram,
                linkZalo: linkZalo
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result == true) {
                    if (image != "") {
                        const formData = new FormData();
                        formData.append("model", image)
                        fetch(variable.API_URL + "Footer/CreateImageFooter", {
                            method: "POST",
                            body: formData
                        }).then(res => res.json())
                    }
                    message.success("Thành công")
                    window.location.reload(false)
                }
            })
    }
    )
    return (

        <div style={{ marginLeft: 21, marginTop: 20 }}>
            <PageContainer title="Cài đặt thông tin trang web" description="this is Sample page" >
                <BackTop />
                <div hidden>
                    {document.documentElement.scrollTop = 0}
                </div>
                <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
                <div style={{ marginLeft: "-50px" }} className='card mb-3'>
                    <div className='card-header' style={{ backgroundColor: theme.palette.primary.main }}>
                        <h3 style={{ color: "beige" }} className='text white mb-0'>Thông tin trang web</h3>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label>Tên</label>
                                <input onChange={(e) => {
                                    settitle(e.target.value)
                                }} type='text' className='form-control' value={title} ></input>
                                <label>Logo trang Web</label>
                                <div onClick={() =>
                                    input.current.click()
                                }>
                                    <input onChange={(e) => ImgUp(e)} ref={input} hidden id="a" type='file' className='form-control'></input>
                                    {image == "" ? <img style={{ width: 50, marginLeft: "44%", marginTop: "5px" }} src={'https://localhost:7067/wwwroot/Image/Footer/' + data.avatar} />
                                        : <img style={{ width: 50, marginLeft: "44%", marginTop: "5px" }} src={URL.createObjectURL(image)} />
                                    }
                                </div>
                                <br />
                                <button style={{ float: 'right', borderRadius: "7.25px" }} onClick={() => document.getElementById("a").click()}>Chọn ảnh </button>
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label>Số điện thoại</label>
                                <input type='text' onChange={(e) => {
                                    setphone(e.target.value)
                                }} className='form-control' value={phone}></input>
                                <label>Địa chỉ</label>
                                <input type='text' onChange={(e) => {
                                    setadress(e.target.value)
                                }} className='form-control' value={adress}></input>
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label>Email</label>
                                <input onChange={(e) => {
                                    setemail(e.target.value)
                                }} type='text' value={email} className='form-control'></input>
                                <label>Link Zalo</label>
                                <input onChange={(e) => {
                                    setlinkZalo(e.target.value)
                                }} type='text' value={linkZalo} className='form-control'></input>
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label>Link Facebook</label>
                                <input onChange={(e) => {
                                    setlinkFacebook(e.target.value)
                                }} type='text' value={linkFacebook} className='form-control'></input>
                                <label>Link Instagram</label>
                                <input onChange={(e) => {
                                    setlinkInstagram(e.target.value)
                                }} type='text' value={linkInstagram} className='form-control'></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type='button' onClick={() => Update()} className='btn btn-primary float-start' >Thay đổi</button>
                </div>



            </PageContainer>
        </div>
    );
};
export default ReviewList;
