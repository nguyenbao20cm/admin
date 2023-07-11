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
            ProductType: [], id1: "",
            modelTitle: "",
            Name: "",
            id: 0, StatusCheck: "",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false

        }

    }

    refreshList() {

        fetch(variable.API_URL + "ProductTypes/GetAllProductType")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data, Trangthai: null, currentPage: this.state.currentPage });
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
            ProductType,
            modelTitle,
            id, NameinputProductType,
            Name,
            currentPage, open1,
            Status,
        } = this.state;
        const recordsPerPage = 5;
        const options = ['Hiển thị', 'Ẩn']
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = ProductType.slice(firstIndex, lastIndex);
        const npage = Math.ceil(ProductType.length / recordsPerPage)
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
                                    <label>Tìm kiếm theo tên loại</label>
                                    <div><input className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Tên loại sản phẩm" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ width: "135px" }}>
                        <div className="card-body">
                            <label>Trạng thái:</label>
                            <div className>
                    
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
                    Thêm loại
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
                                        Tên loại
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Sửa
                                    </th>
                                    <th>
                                        Xóa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ProductType.filter((item) => {
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

                                                {dep.status == true ?
                                                    "Hiển thị" : "Ẩn"
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

