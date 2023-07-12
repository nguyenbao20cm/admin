import * as React from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import $ from "jquery"
import { Alert, Space, message } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {
    IconCheck,
} from '@tabler/icons';
import 'sweetalert2/src/sweetalert2.scss'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


class CRUDProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Account: [], id1: "",
            modelTitle: "", Quyen: "",
            Name: "",
            id: 0, StatusCheck: "",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false, TenNguoiDung: "",
            Email: "",
            SDT: "",
            DiaChi: "",
            FullName: "", matkhau: "",
            Anh: "", History: []

        }

    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Account/GetAllAccountStaff", {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Account: data, Trangthai: null, currentPage: this.state.currentPage });
            })
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    CreateClick() {
        if (this.state.TenNguoiDung == "") return this.loi("Bạn chưa nhập tên tài khoản!", "Hãy nhập lại")
        const usernameRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;
        if (!usernameRegex.test(this.state.TenNguoiDung)) {
            return this.loi(" Vui lòng nhập tên tài khoản có ít nhất 5 ký tự (không dùng tiếng việt có dấu) và ít nhất 1 chữ viết hoa.")
        }
        //email
        if (this.state.Email == "") return this.loi("Bạn chưa nhập Email!")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.Email)) {
            return this.loi('Địa chỉ email không hợp lệ! Vui lòng nhập một địa chỉ email hợp lệ.');
        }
        //password
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
        if (this.state.matkhau == "") return this.loi("Bạn chưa nhập mật khẩu!")
        if (!passwordRegex.test(this.state.matkhau)) {
            return this.loi('Mật khẩu không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
        }
        //số điện thoại
        const phoneRegex = /^0\d{9}$/;
        if (this.state.SDT == "") return this.loi("Số điện thoại không được để trống")

        if (!phoneRegex.test(this.state.SDT)) {
            return this.loi("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
        }

        //họ và tên	
        if (this.state.FullName == "") return this.loi("Bạn chưa nhập họ và tên!")


        if (this.state.DiaChi == "") return this.loi("Bạn chưa nhập địa chỉ!")
        if (this.state.tenanh == "") return this.loi("Bạn chưa chọn ảnh đại diện!")

        if (this.state.Status == "") return this.loi("Bạn chưa chọn trạng thái!")


        const token = this.getToken();
        fetch(variable.API_URL + "Account/register-Staff-BanHang", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body:
                JSON.stringify({
                    username: this.state.TenNguoiDung,
                    email: this.state.Email,
                    password: this.state.matkhau,
                    phone: this.state.SDT,
                    address: this.state.DiaChi,
                    fullName: this.state.FullName,
                    image: this.state.tenanh,
                    status: this.state.Status == "Hoạt động" ? true : false,
                })
        }).then(res => res.json())
            .then(result => {
                if (result == "12")
                    return this.loi("Tên đăng nhập này đã được sử dụng")
                if (result == 2)
                    return this.loi("Số điện thoại này đã được sử dụng")
                if (result == 3)
                    return this.loi("Email này đã được sử dụng")
                const formData = new FormData()
                var imagelName = this.state.TenNguoiDung
                formData.append("model", this.state.Anh, imagelName)
                fetch(variable.API_URL + "Account/CreateAvatarImage", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
                if (result == true) {
                    message.success("Thành công")
                    document.getElementById("closeModal").click()
               
                             this.refreshList()
                }
                else
                    this.loi("Thất bại", "Hãy nhập lại")
            }, (error) => {
                console.log(error)
                this.loi("Failed")

            }
            )
    }
    ChangeProdcutImage = (e) => {
        if (e.target.files[0] != null)
            this.setState({ tenanh: e.target.files[0].name, Anh: e.target.files[0] });

    }

    UpdateClick(id) {
        const token = this.getToken();
        fetch(variable.API_URL + "Account/register-Staff", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body:
                JSON.stringify({
                    username: this.state.TenNguoiDung,
                    email: this.state.Email,
                    password: this.state.matkhau,
                    phone: this.state.SDT,
                    address: this.state.DiaChi,
                    fullName: this.state.FullName,
                    image: this.state.tenanh,
                    status: this.state.Status == "Hoạt động" ? true : false,
                })
        }).then(res => res.json())
            .then(result => {
                const formData = new FormData()
                var imagelName = this.state.TenNguoiDung
                formData.append("model", this.state.Anh, imagelName)
                fetch(variable.API_URL + "Account/CreateAvatarImage", {
                    method: "POST",
                    body: formData
                }).then(res => res.json())
                    .then(result => {
                        message.success(result)
                        document.getElementById("closeModal").click()
                        this.state.Trangthai == true ? this.CheckTrue()
                            : this.state.Trangthai == false ? this.CheckFalse()
                                : this.refreshList()
                    })
                message.success("Thành công")
                document.getElementById("closeModal").click()
             
                         this.refreshList()
            }, (error) => {

                this.loi("Đã xảy ra lỗi", "Hãy nhập lại")
            }
            )
    }
    DeleteClick(dep) {
        this.setState({ open1: true, id1: dep })
    }

    Delete() {
        const token = this.getToken();
        fetch(variable.API_URL + "Account/DeleteAccount/" + this.state.id1, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(res => res.json())
            .then(result => {
                message.success(result)
                this.setState({ open1: false })
                this.refreshList();

            }, (error) => {
                console.log(error)
                this.loi("Failed")

            }
            )
    }

    addClick() {
        this.setState({
            modelTitle: "Thêm loại sản phẩm",
            id: 0,
            Name: "",
            Status: "",
            TenNguoiDung: "",
            Email: "",
            matkhau: "",
            SDT: "",
            DiaChi: "",
            FullName: "",
            tenanh: "",
            
        });
    }
    EditClick(dep) {
        this.setState({
            StatusCheck: dep.status == true ?
                "Hoạt động" : "Khóa",
            modelTitle: "Sửa loại sản phẩm ",
            id: dep.id,
            Name: dep.name,
            Status:
                dep.status == true ?
                    "Hoạt động" : "Khóa"
            ,
            TenNguoiDung: dep.username,
            Email: dep.email,
            matkhau: dep.password,
            SDT: dep.phone,
            DiaChi: dep.address,
            FullName: dep.FullName,
            tenanh: dep.avatar,
        });
    }
    loi(title, text) {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',
            timer: 1500
        })
    }
    NextPage(id, npage) {

        if (id !== npage) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }
    PrePage(id) {
        if (id !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }
    changePage(id) {

        this.setState({
            currentPage: id
        });
    }
    ChangeNameinputProductType(value) {
        this.setState({
            NameinputProductType: value.target.value,
            currentPage: 1,

        });

    }
    //0 all 1 false 2 true
    CheckAll() {


        this.refreshList()

    }
    CheckTrue() {

        const token = this.getToken();
        fetch(variable.API_URL + "Account/GetAllAccountStaffStatusTrue", {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Account: data,
                    currentPage: 1,
                    Trangthai: true, NameinputProductType: ""
                });
            })
    }
    CheckFalse() {
      
            const token = this.getToken();
            fetch(variable.API_URL + "Account/GetAllAccountStaffStatusFalse", {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        Account: data,
                        currentPage:1,
                        Trangthai: false, NameinputProductType: ""
                    });
                })
    }
    DetailsClick(dep) {
        const token = this.getToken();
        fetch(variable.API_URL + "HistoryAccount/GetHistoryAccount/" + dep.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ History: data });
            })

    }
    Check(id) {
        const token = this.getToken();
        fetch(variable.API_URL + "Account/ActiveAccount/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(res => res.json())
            .then(result => {
                if (result == true) {
                    message.success("Thành công")
                    this.refreshList();
                }
                if (result == false) {
                    message.error("Thất bại")
                }
            }, (error) => {
                console.log(error)
                this.loi("Failed")
            }
            )
    }
    DatetimeFormat(e) {
        const abc = new Date(e)
        var day = abc.getDate() + "/";
        var month = abc.getMonth() + 1 + "/";
        var year = abc.getFullYear()
        let format4 = day + month + year;
        return format4;
    }
    render() {

        const {
            Account,
            modelTitle,
            id, NameinputProductType,
            Name, matkhau,
            currentPage, open1,
            Status, TenNguoiDung,
            Email,
            SDT, History, tenanh,
            DiaChi,
            FullName,
            Anh,
        } = this.state;
        const recordsPerPage = 5;
        const options = ['Hoạt động', 'Khóa']


        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Account.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Account.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>
                <Dialog
                    open={open1}
                    keepMounted
                    onClose={() => {
                        this.setState({ open1: false })
                    }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Bạn có chắc chắc muốn khóa tài khoản"}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.Delete()
                        }}>Chấp nhận</Button>
                        <Button onClick={() => {
                            this.setState({ open1: false })
                        }}>Quay lại</Button>
                    </DialogActions>
                </Dialog>
                <div style={{ display: "flex", }}>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body" >
                            <div>
                                <div className="form-group" >
                                    <label>Tìm kiếm theo Id tài khoản</label>
                                    <input style={{ width: "200px" }} className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="ID Tài khoản" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ width: "135px" }}>
                        <div className="card-body">
                            <label>Trạng thái:</label>
                            <div className>

                                <input type="radio" id="True" name="fav_language" value="True" onClick={() => this.CheckTrue()} />
                                <label for="True">Hoạt động</label><br />
                                <input type="radio" id="False" name="fav_language" value="False" onClick={() => this.CheckFalse()} />
                                <label for="False">Đã bị khóa</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Tạo tài khoản
                </button>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        ID Tài khoản
                                    </th>
                                    <th>
                                        Tên đăng nhập
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        SĐT
                                    </th>
                                    <th>
                                        Địa chỉ
                                    </th>
                                    <th>
                                        Tên người dùng
                                    </th>
                                    <th>
                                        Ảnh đại diện
                                    </th>
                                    {/* <th>
                                        Quyền
                                    </th> */}
                                    {/* <th>
                                        Level
                                    </th> */}
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Xem lịch sử
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Account.filter((item) => {
                                    return this.state.NameinputProductType === ""
                                        ? item
                                        : item.id.toString().includes(this.state.NameinputProductType);
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.username}
                                            </td>
                                            <td>
                                                {dep.email}
                                            </td>
                                            <td>
                                                {dep.phone}
                                            </td>
                                            <td>
                                                {dep.address}
                                            </td>
                                            <td>
                                                {dep.fullName}
                                            </td>
                                            <td>
                                                <img style={{ width: 50 }} src={'https://localhost:7067/wwwroot/Image/Avatar/' + dep.avatar} />
                                            </td>
                                            {/* <td>
                                                {dep.permission}
                                            </td> */}
                                            {/* <td>
                                                {dep.level}
                                            </td> */}
                                            <td>

                                                {dep.status == true ?
                                                    "Hoạt động" : "Khóa"
                                                }
                                            </td>
                                            {/* <td>
                                                <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModal'
                                                    onClick={() => this.EditClick(dep)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                            </td> */}
                                            <td>
                                                {/* <button type='button' className='btn btn-light mr-1' data-toggle="modal" data-target="#exampleModal"
                                                onClick={() => this.DetailsClick(dep)}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /> <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /> </svg>
                                                </button> */}
                                                <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#data'
                                                    onClick={() => this.DetailsClick(dep)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /> <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /> </svg>
                                                </button>
                                            </td>
                                            <td>
                                                {
                                                    dep.status == false ? <button width="16" height="16" type='button' className='btn btn-light mr-1' onClick={() => this.Check(dep.id)}>
                                                        <IconCheck></IconCheck>
                                                    </button>
                                                        : <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                            </svg>
                                                        </button>
                                                }
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>

                        {/* sss */}
                        <div class="scrollmenu">
                            <ul className='pagination'>
                                {numbers.map((n, i) => (
                                    <li className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href='#' className='page-link'
                                            onClick={() => this.changePage(n)}>{n}</a>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/* ? */}

                </Paper>
                <div className="modal fade" id="data" tabIndex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className='modal-title'>Lịch sử thao tác</h5>
                                <button id="closeModal1" type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <table id="example" className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>
                                                Tên thao tác
                                            </th>
                                            <th>
                                                Ngày
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {History.map(dep =>

                                            <tr >
                                                <td>
                                                    {dep.content}
                                                </td>
                                                <td>
                                                    {this.DatetimeFormat(dep.datetime)}
                                                </td>


                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className='modal-title'>{modelTitle}</h5>
                                <button id="closeModal" type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                </button>
                            </div>
                            <div className='modal-body'>


                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        UserName
                                    </span>
                                    <input type='text' style={{ width: '20px' }} className='form-control' value={TenNguoiDung}
                                        onChange={(e) =>
                                            this.setState({
                                                TenNguoiDung: e.target.value
                                            })
                                        } />
                                    <span className='input-group-text'>
                                        Email
                                    </span>
                                    <input type='text' className='form-control' value={Email}
                                        onChange={(e) =>
                                            this.setState({
                                                Email: e.target.value
                                            })
                                        } />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Số điện thoại
                                    </span>
                                    <input type='text' style={{ width: '48px' }} className='form-control' value={SDT}
                                        onChange={(e) =>
                                            this.setState({
                                                SDT: e.target.value
                                            })
                                        } />
                                    <span className='input-group-text'>
                                        Địa chỉ
                                    </span>
                                    <input type='text' className='form-control' value={DiaChi}
                                        onChange={(e) =>
                                            this.setState({
                                                DiaChi: e.target.value
                                            })
                                        } />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Tên đầy đủ
                                    </span>
                                    <input type='text' style={{ width: '50px' }} className='form-control' value={FullName}
                                        onChange={(e) =>
                                            this.setState({
                                                FullName: e.target.value
                                            })
                                        } />
                                    <span className='input-group-text'>
                                        Mật khẩu
                                    </span>
                                    <input type='text' className='form-control' value={matkhau}
                                        onChange={(e) =>
                                            this.setState({
                                                matkhau: e.target.value
                                            })
                                        }
                                    />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Ảnh
                                    </span>
                                    <input readOnly type='text' className='form-control' value={tenanh}
                                        onChange={(e) => this.ChangeProdcutImage(e)} />
                                    <input hidden type="file" name="file" id="file" class="inputfile" onChange={(e) =>
                                        this.ChangeProdcutImage(e)
                                    } />
                                    <button style={{ float: 'right', borderRadius: "7.25px" }} onClick={() => document.getElementById("file").click()}>Thay đổi </button>
                                </div>
                                <div className='input-group mb-3'>

                                    <span className='input-group-text'>
                                        Trạng thái
                                    </span>
                                    <Autocomplete
                                        value={Status}
                                        disableClearable
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                Status: newValue
                                            });

                                        }}

                                        options={options}
                                        style={{ width: 300 }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                // label="Pay"
                                                variant="outlined" />}
                                    />

                                </div>
                                {/* <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Quyền
                                    </span>
                                    <Autocomplete
                                        value={Quyen}
                                        disableClearable
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                Status: newValue
                                            });

                                        }}

                                        options={options1}
                                        style={{ width: 300 }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                // label="Pay"
                                                variant="outlined" />}
                                    />

                                </div> */}

                            </div>
                            <div class="modal-footer">
                                {id == 0 ?// eslint-disable-next-line
                                    <button type='button' className='btn btn-primary float-start' onClick={() => this.CreateClick()}>Thêm</button> : null
                                }
                                {id != 0 ?// eslint-disable-next-line
                                    <button type='button' className='btn btn-primary float-start' onClick={() => this.UpdateClick(this.state.id)}>Sửa</button> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



export default CRUDProductType;

