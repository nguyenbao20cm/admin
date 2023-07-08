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
import { a } from 'react-spring';


class CRUDProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Account: [], id1: "",
            modelTitle: "",
            Name: "",
            id: 0, StatusCheck: "", vouc: "",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false, Voucher: [], data: {}, a: {}

        }

    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Account/GetAllAcountCustomer", {
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
        fetch(variable.API_URL + "Vouchers/GetAllVoucher", {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Voucher: data });
            })
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    CreateClick() {
        if (this.state.Status == "" || this.state.Name == "") return this.loi("Dữ liệu bị rỗng ", "Hãy nhập lại")
        else
            if (this.state.Name == "") return this.loi("Tên loại bị rỗng ", "Hãy nhập lại")
            else {
                fetch(variable.API_URL + "ProductTypes/CreateProductType", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.state.Name,
                        status: this.state.Status == "Hiển thị" ? true : false,
                    })
                }).then(res => res.json())
                    .then(result => {
                        if (result == "Thành công") {
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

    }
    UpdateClick(id) {
        if (this.state.Name == "") return this.loi("Tên loại bị rỗng ", "Hãy nhập lại")
        else
            if (this.state.Status == "") return this.loi("Trạng thái bị rỗng ", "Hãy nhập lại")
            else {
                fetch(variable.API_URL + "ProductTypes/UpdateProductType/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.state.Name,
                        status: this.state.Status == "Hiển thị" ? true : false,
                    })
                }).then(res => res.json())
                    .then(result => {
                        if (result == "Thành công") {
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
                            message.error(result)
                    }, (error) => {
                        message.error("Failed")
                    }
                    )
            }

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
                message.error("Failed")

            }
            )
    }
    addClick() {
        this.setState({
            modelTitle: "Thêm loại sản phẩm",
            id: 0,
            Name: "",
            Status: "",
        });
    }
    EditClick(dep) {
        this.setState({
            StatusCheck: dep.status == true ?
                "Hiển thị" : "Ẩn",
            modelTitle: "Sửa loại sản phẩm ",
            id: dep.id,
            Name: dep.name,
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
                    ProductType: data, currentPage: 1,
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
            const a = this.state.ProductType.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusTrue")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
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
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : this.state.currentPage,
                        Trangthai: true, NameinputProductType: ""
                    });
                })
        }
    }
    Vouce() {
        if (this.state.vouc == "") return this.loi("Dữ liệu bị rỗng ", "Hãy nhập lại")
        const token = this.getToken();
        fetch(variable.API_URL + "Vouchers/GetVoucherByid/" + this.state.vouc.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },

        }).then(res => res.json())
            .then(result => {
                this.setState({ a: result })
            }, (error) => {
                console.log(error)
                message.error("Failed")
            }
            )
        fetch(variable.API_URL + "Vouchers/SendVoucher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                email: this.state.data.email,
                subject: this.state.a.title,
                message: this.state.a.name,
            })
        }).then(res => res.json())
            .then(result => {
                if (result == "ok") {
                    document.getElementById("closeModal1").click()
                    message.success("Thành công")
                }

            }, (error) => {
                console.log(error)
                message.error("Failed")

            }
            )
    }
    data(dep) {
        this.setState({
            data: dep
        })
    }
    CheckFalse() {
        if (this.state.StatusCheck != this.state.Status) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.ProductType.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusFalse")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
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
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : this.state.currentPage,
                        Trangthai: false, NameinputProductType: ""
                    });
                })
        }
    }
    render() {

        const {
            Account,
            modelTitle,
            id, NameinputProductType,
            Name,
            currentPage, open1, Voucher,
            Status, vouc
        } = this.state;
        const recordsPerPage = 5;
        const options = ['Hiển thị', 'Ẩn']
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Account.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Account.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        // const optionProductType1 = []
        // Voucher.forEach(element => {
        //     optionProductType1.push({name: element.title ,id:element.id})
        // });
        const optionProductType1 = Voucher.map((dep) => ({
            id: dep.id,
            name: dep.title,
        }))
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
                                    <div><input style={{ width: "200px" }} className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="ID Tài khoản" />
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
                                <label for="True">Hoạt động</label><br />
                                <input type="radio" id="False" name="fav_language" value="False" onClick={() => this.CheckFalse()} />
                                <label for="False">Đã bị khóa</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Thêm loại
                </button> */}
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
                                    </th>
                                    <th>
                                        Level
                                    </th> */}
                                    <th>
                                        Gửi Voucher
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>

                                    <th>
                                        Khóa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Account.filter((item) => {
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
                                            </td>
                                            <td>
                                                {dep.level}
                                            </td> */}
                                            <td>
                                                <button type='button' onClick={() => {
                                                    this.data(dep)
                                                }} className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModalCenter'>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /> <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /> </svg>
                                                </button>
                                            </td>
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
                                                {
                                                    dep.status == false ? null : <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.id)}>
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
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Kho Voucher</h5>
                                <button id="closeModal1" type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                </button>
                            </div>
                            <div class="modal-body">
                                <span >
                                    Voucher
                                </span>

                                <Autocomplete
                                    value={vouc}
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        this.setState({
                                            vouc: newValue
                                        });
                                    }}
                                    options={optionProductType1}
                                    getOptionLabel={(e) => e.name || " "}
                                    style={{ width: 300 }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            // label="Pay"
                                            variant="outlined" />}
                                />

                            </div>
                            <div class="modal-footer">
                                <button type='button' onClick={() => this.Vouce()} className='btn btn-primary float-start' >Gửi</button>
                            </div>
                            {/* <div class="modal-footer">
                                        <h4>Tổng hóa đơn: {" "}{this.total(DetailsInvoice)}</h4>
                                    </div> */}
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
                                        Tên loại
                                    </span>
                                    <input type='text' className='form-control' value={Name}
                                        onChange={(e) => this.ChangeProdcutTypeName(e)} />
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

                            </div>
                            <div class="modal-footer">
                                <button type='button' className='btn btn-primary float-start' onClick={() => this.DeleteClick()}>Thêm</button> : null
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



export default CRUDProductType;

