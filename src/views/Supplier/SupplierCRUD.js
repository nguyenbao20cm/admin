import * as React from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import $ from "jquery"
import { Alert, Space, message } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'

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
            Voucher: [], id1: "",
            modelTitle: "", address: "", email: "", phone:'',taxcode:"",
            Name: "", Ma: "", Giamgia: "",
            id: 0, StatusCheck: "",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false

        }

    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Suppliers/GetAllSupplier", {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Voucher: data, Trangthai: null, currentPage: this.state.currentPage });
            })
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    CreateClick() {
        const token = this.getToken();
        if (this.state.Ma == null) return this.loi("Tên nhà cung cấp bị rỗng ", "Hãy nhập lại")
        if (this.state.email == null) return this.loi("Email nhà cung cấp bị rỗng ", "Hãy nhập lại")
        if (this.state.address == null) return this.loi("Địa chỉ nhà cung cấp bị rỗng ", "Hãy nhập lại")
        fetch(variable.API_URL + "Suppliers/CreateSupplier", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                name: this.state.Ma,
                email: this.state.email, phone: this.state.phone, taxCode:this.state.taxcode,
                address: this.state.address
            })
        }).then(res => res.json())
            .then(result => {
                if (result == true) {
                    message.success("Thành công")
                    this.state.Trangthai == true ? this.CheckTrue()
                        : this.state.Trangthai == false ? this.CheckFalse()
                            : this.refreshList()
                    document.getElementById("closeModal").click()
                }
                else
                    message.error(result)
            }, (error) => {
                message.error("Failed")
            });


    }
    UpdateClick(id) {
        const token = this.getToken();
        if (this.state.Ma == null) return this.loi("Tên nhà cung cấp bị rỗng ", "Hãy nhập lại")
        if (this.state.email == null) return this.loi("Email nhà cung cấp bị rỗng ", "Hãy nhập lại")
        if (this.state.address == null) return this.loi("Địa chỉ nhà cung cấp bị rỗng ", "Hãy nhập lại")
        fetch(variable.API_URL + "Suppliers/UpdateSupplier/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                    name: this.state.Ma,
                email: this.state.email, taxCode: this.state.taxcode,
                    phone: this.state.phone,
                    address: this.state.address
            })
        }).then(res => res.json())
            .then(result => {
                if (result == true) {
                    message.success("Thành công")
                    this.setState({
                        currentPage: this.state.currentPage
                    });

                    this.state.Trangthai == true ? this.CheckTrue()
                        : this.state.Trangthai == false ? this.CheckFalse()
                            : this.refreshList()
                    document.getElementById("closeModal").click()
                }
                else
                    message.error("")
            }, (error) => {
                message.error("Failed")
            }
            )
    }
    DeleteClick(dep) {
        this.setState({ open1: true, id1: dep })
    }
    DeleteClick1() {

        fetch(variable.API_URL + "ProductTypes/DeleteProductType/" + this.state.id1, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(result => {
                message.success(result)
                this.setState({ open1: false })
                this.refreshList();
            }, (error) => {
                message.error("Failed")
            }
            )

    }

    addClick() {
        this.setState({
            modelTitle: "Thêm loại sản phẩm",
            id: 0,
            Name: "", Ma: "", Giamgia: "",
            Status: "",email:"", phone:"",address:"",taxcode:""
        });
    }
    EditClick(dep) {
        this.setState({
            Ma: dep.name, taxcode:dep.taxCode,
            email: dep.email, phone:dep.phone, address: dep.address,
            StatusCheck: dep.status == true ?
                "Hiển thị" : "Ẩn",
            modelTitle: "Sửa loại sản phẩm ",
            id: dep.id,
            Name: dep.name, Ma: dep.name, Giamgia: dep.disscount,
            Status:
                dep.status == true ?
                    "Hiển thị" : "Ẩn"
            ,

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


        fetch(variable.API_URL + "ProductTypes/GetAllProductType")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Voucher: data, currentPage: 1,
                    Trangthai: null,
                    NameinputProductType: ""
                });
            })

    }
    CheckTrue() {
        if (this.state.StatusCheck != this.state.Status) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.Voucher.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusTrue")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        Voucher: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: true, NameinputProductType: ""
                    });
                })
        }
        else {
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusTrue")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        Voucher: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : this.state.currentPage,
                        Trangthai: true, NameinputProductType: ""
                    });
                })
        }
    }
    CheckFalse() {
        if (this.state.StatusCheck != this.state.Status) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.Voucher.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusFalse")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        Voucher: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: false, NameinputProductType: ""
                    });
                })
        }
        else {
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusFalse")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        Voucher: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : this.state.currentPage,
                        Trangthai: false, NameinputProductType: ""
                    });
                })
        }
    }
    render() {

        const {
            Voucher, Ma, Giamgia,
            modelTitle, phone,
            id, NameinputProductType,taxcode,
            Name, address, email,
            currentPage, open1,
            Status,
        } = this.state;
        const recordsPerPage = 5;
        const options = ['Hiển thị', 'Ẩn']
        const Sale = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"]
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Voucher.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Voucher.length / recordsPerPage)
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
                    <DialogTitle>{"Bạn có chắc chắc muốn hoàn tất đơn hàng"}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.DeleteClick1()
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
                                <div className="form-group">
                                    <label>Tìm kiếm theo tên nhà cung cấp</label>
                                    <div><input className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Tên nhà cung cấp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ width: "135px" }}>
                        <div className="card-body">
                            <label>Trạng thái:</label>
                            <div className>
                                <input type="radio" id="All" name="fav_language" value="All" onClick={() => this.CheckAll()} />
                                <label for="All">Tất cả</label><br />
                                <input type="radio" id="True" name="fav_language" value="True" onClick={() => this.CheckTrue()} />
                                <label for="True">Hiển thị</label><br />
                                <input type="radio" id="False" name="fav_language" value="False" onClick={() => this.CheckFalse()} />
                                <label for="False">Ẩn</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Thêm nhà cung cấp
                </button>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Tên nhà cung cấp
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Số điện thoại
                                    </th>
                                    <th>
                                        Mã số thuế
                                    </th>
                                    <th>
                                        Địa chỉ
                                    </th>
                                    <th>
                                        Sửa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Voucher.filter((item) => {
                                    return this.state.NameinputProductType === ""
                                        ? item
                                        : item.name.toString().includes(this.state.NameinputProductType);
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.name}
                                            </td>
                                            <td>
                                                {dep.email}
                                            </td>
                                            <td>

                                                {dep.phone
                                                }
                                            </td>
                                            <td>

                                                {dep.taxCode
                                                }
                                            </td>
                                            <td>

                                                {dep.address
                                                }
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModal'
                                                    onClick={() => this.EditClick(dep)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        {/* sss */}
                        <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a href='#' className='page-link' onClick={() => this.PrePage(this.state.currentPage)}>{"<"}</a>
                                </li>
                                {
                                    numbers.map((n, i) => (
                                        <li className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a href='#' className='page-link'
                                                onClick={() => this.changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li className='page-item'>
                                    <a href='#' className='page-link' onClick={() => this.NextPage(this.state.currentPage, npage)}>{">"}</a>
                                </li>

                            </ul>
                        </nav>
                    </div>
                    {/* ? */}

                </Paper>
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
                                        Tên nhà cung cấp
                                    </span>
                                    <input type='text' className='form-control' value={Ma}
                                        onChange={(e) => this.setState({
                                            Ma: e.target.value
                                        })} />
                                </div>     <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Số điện thoại nhà cung cấp
                                    </span>
                                    <input type='text' className='form-control' value={phone}
                                        onChange={(e) => this.setState({
                                            phone: e.target.value
                                        })} />
                                    <span className='input-group-text'>
                                        Mã số thuế
                                    </span>
                                    <input type='text' className='form-control' value={taxcode}
                                        onChange={(e) => this.setState({
                                            taxcode: e.target.value
                                        })} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Email
                                    </span>
                                    <input type='text' className='form-control' value={email}
                                        onChange={(e) => this.setState({
                                            email: e.target.value
                                        })} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Địa chỉ
                                    </span>
                                    <input type='text' className='form-control' value={address}
                                        onChange={(e) => this.setState({
                                            address: e.target.value
                                        })} />

                                </div>

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

