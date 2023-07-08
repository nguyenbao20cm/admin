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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
    Col, Row, Spin, Card, Badge, Empty, Input,
    Form, Pagination, Modal, Popconfirm, notification, BackTop, Tag, Breadcrumb, Table
} from 'antd';
import CountUp from 'react-countup';
class CRUDProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductType: [], id1: "",
            modelTitle: "", quantity: "",
            Name: "",
            id: 0, StatusCheck: "", startDate: "", endDate:"",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false, GiaNhap: "", Size: "", ProductSizeId: "",
            APIProduct: [], ProductId: "", Nhacungcap: "", APINhaCungCap: [], APIProductSize: []
        }

    }

    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "ImportInvoices/GetAllImportInvoice", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data, Trangthai: null, currentPage: this.state.currentPage });
            })
        fetch(variable.API_URL + "Products/GetAllProduct", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ APIProduct: data, });
            })

        fetch(variable.API_URL + "Suppliers/GetAllSupplier", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ APINhaCungCap: data, });
            })
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    CreateClick() {
        if (this.state.ProductSizeId == "") return this.loi("Sản phẩm đang rỗng", "Hãy nhập dữ liệu lại")
        if (this.state.Nhacungcap == "") return this.loi("Sản phẩm đang rỗng", "Hãy nhập dữ liệu lại")
        if (this.state.GiaNhap == 0) return this.loi("Dữ liệu không đúng", "Hãy kiểm liệu dữ liệu nhập")
        if (this.state.quantity == 0) return this.loi("Dữ liệu không đúng", "Hãy kiểm liệu dữ liệu nhập")
        if (Number.isInteger(this.state.GiaNhap) || Number(this.state.GiaNhap) < 0) return this.loi("Dữ liệu không đúng", "Hãy kiểm liệu dữ liệu nhập")
        if (Number.isInteger(this.state.quantity)|| Number(this.state.quantity) < 0) return this.loi("Dữ liệu không đúng", "Hãy kiểm liệu dữ liệu nhập")
        const token = this.getToken();
        fetch(variable.API_URL + "ImportInvoices/CreateImportInvoice", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                productSizeId: this.state.ProductSizeId,
                supplierId: this.state.Nhacungcap,
                importPrice: this.state.GiaNhap,
                quantity: this.state.quantity,
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
                    message.error("result")
            }, (error) => {
                message.error("Failed")
            });
    }
    UpdateClick(id) {
        const token = this.getToken();
        if (this.state.Name == "") return this.loi("Tên loại bị rỗng ", "Hãy nhập lại")
        else
            if (this.state.Status == "") return this.loi("Trạng thái bị rỗng ", "Hãy nhập lại")
            else {
                fetch(variable.API_URL + "BrandProducts/UpdateBrandProducts/" + id, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token.value}`
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
        const token = this.getToken();
        fetch(variable.API_URL + "ImportInvoices/DeleteImportInvoice/" + this.state.id1, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
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
            modelTitle: "Tạo hóa đơn nhập",
            id: 0,
            Name: "",
            Status: "",
            GiaNhap: 0,
            quantity: 0,
        });
    }
    EditClick(dep) {
        this.setState({
            GiaNhap: dep.importPrice,
            quantity: dep.quantity,
            Nhacungcap: dep.supplier,
            ProductSizeId: dep.productSizeId,
            StatusCheck: dep.status == true ?
                "Hiển thị" : "Ẩn",
            modelTitle: "Sửa hóa đơn",
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
    ChangeStartDate(value) {
        this.setState({
            startDate: value.target.value
        });
    }
    ChangeEndDate(value) {
        this.setState({
            endDate: value.target.value
        });
    }
    //0 all 1 false 2 true
    ApplyClick() {
        const token = this.getToken();
        if (this.state.startDate == "") return message.warning("Dữ liệu bị trống")
        if (this.state.endDate == "") return message.warning("Dữ liệu bị trống")
        fetch(variable.API_URL + "ImportInvoices/GetAllImportInvoice/" + this.state.startDate + "," + this.state.endDate, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data,  currentPage: 1 });
            })


    }
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
    GetProductSIzeAPI(id) {
        const token = this.getToken();
        fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ APIProductSize: data, });
            })
    }
    DatetimeFormat(e) {
        const abc = new Date(e)
        var day = abc.getDate() + "/";
        var month = abc.getMonth() + 1 + "/";
        var year = abc.getFullYear()
        let format4 = day + month + year;
        return format4;
    }
    onChange(value) {
        console.log(`selected ${value}`);
    };
    onSearch(value) {
        console.log('search:', value);
    };
    render() {

        const {
            ProductType, GiaNhap, Size, ProductSizeId, APIProductSize,
            modelTitle,
            id, NameinputProductType,
            Name, Nhacungcap,
            currentPage, open1,
            Status, APIProduct, ProductId, APINhaCungCap, quantity
        } = this.state;

        const OPtionProduct = APIProduct.map((dep) => ({
            id: dep.id,
            nameProduct: dep.name,

        }))
        const OPtionProductSize = APIProductSize.map((dep) => ({
            id: dep.id,
            nameProduct: dep.name,

        }))
        const OptionNhaCungCap = APINhaCungCap.map((dep) => ({
            id: dep.id,
            nameProduct: dep.name,

        }))

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
                    <DialogTitle>{"Bạn có chắc chắc muốn xóa đơn"}</DialogTitle>
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
                                    <label>Tìm kiếm theo ID hóa đơn</label>
                                    <div><input className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="ID" />
                                    </div>
                                    <button type='button' className='btn btn-primary m-2 float-end'
                                        onClick={() => this.refreshList()}>
                                        Reset Trang
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="form-group">
                                    <label>Từ ngày:</label>
                                    <div>
                                        <input id="dates-range" className="form-control flatpickr-input"
                                            type="date" onChange={(e) => this.ChangeStartDate(e)} />
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <div>
                                        <input id="dates-range" className="form-control flatpickr-input"
                                            type="date" onChange={(e) => this.ChangeEndDate(e)} />
                                    </div>
                                </div>



                                <div className="form-group" >
                                    <div>
                                        <button type='button' className='btn btn-primary m-2 float-end'
                                            onClick={() => this.ApplyClick()}>
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Tạo hóa đơn nhập
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
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Size sản phẩm
                                    </th>
                                    <th>
                                        Ngày lập
                                    </th>
                                    <th>
                                        Giá nhập
                                    </th>
                                    <th>
                                        Số lượng
                                    </th>
                                    <th>
                                        Nhà cung cấp
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
                                        : item.id.toString().includes(this.state.NameinputProductType);
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {((dep.productSize).product).name}
                                            </td>
                                            <td>
                                                {(dep.productSize).name}
                                            </td>
                                            <td>
                                                {this.DatetimeFormat(dep.issuedDate)}
                                            </td>
                                            <td>
                                                <CountUp delay={0.4} end={dep.importPrice} duration={0.6} /> Đồng
                                            </td>
                                            <td>
                                                <CountUp delay={0.4} end={dep.quantity} duration={0.6} />
                                            </td>
                                            <td>
                                                {(dep.supplier).name}
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                    </svg>
                                                </button>
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
                                    {/* <span className='input-group-text'>
                                        Sản phẩm
                                    </span> */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sản phẩm</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Sản phẩm"
                                            onChange={(e) => {
                                                this.GetProductSIzeAPI(e.target.value)
                                                this.setState({
                                                    ProductId: e.target.value
                                                })
                                            }}
                                        >
                                            {
                                                APIProduct.map(e =>
                                                    <MenuItem value={e.id}>{e.name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    {/* <select value={ProductId} onChange={(e) => {
                                        this.GetProductSIzeAPI(e.target.value)
                                        this.setState({
                                            ProductId: e.target.value
                                        })
                                    }} className="custom-select" style={{ width: 300, borderRadius: 0.25 }}>
                                        <option value={0}>Hãy chọn sản phẩm</option>
                                        {
                                            APIProduct.map(e =>
                                                <option value={e.id}>{e.name}</option>
                                            )
                                        }
                                    </select> */}


                                    {/* <Autocomplete
                                        disableClearable
                                        onChange={(event, newValue) => {
                                            this.GetProductSIzeAPI(newValue.id)
                                            this.setState({
                                                ProductSizeId: ""
                                            })
                                        }}
                                        getOptionLabel={(e) => e.nameProduct || " "}
                                        style={{ width: 300 }}
                                        options={OPtionProduct}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                // label="Pay"
                                                variant="outlined" />}
                                    /> */}
                                    {/* <span className='input-group-text'>
                                        Size
                                    </span> */}
                                </div>
                                <div className='input-group mb-3'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Size sản phẩm</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Size sản phẩm"
                                            onChange={(e) => {
                                                this.setState({
                                                    ProductSizeId: e.target.value
                                                })
                                            }}
                                        >
                                            {
                                                APIProductSize.map(e =>
                                                    <MenuItem value={e.id}>{e.name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    {/* <select value={ProductSizeId} onChange={(e) => {

                                        this.setState({
                                            ProductSizeId: e.target.value
                                        })
                                    }} className="custom-select" style={{ width: "41%" }}>
                                        <option value={0}>Hãy chọn size sản phẩm</option>
                                        {
                                            APIProductSize.map(e =>
                                                <option value={e.id}>{e.name}</option>
                                            )
                                        }
                                    </select> */}

                                    {/* var select = document.getElementById('language');
                                    var value = select.options[select.selectedIndex].value;
                                    console.log(value); //  */}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>
                                        Số lượng
                                    </span>
                                    <input type='text' className='form-control' value={this.state.quantity}
                                        onChange={(e) => this.setState({ quantity: e.target.value })} />

                                    <span className='input-group-text'>
                                        Giá nhập
                                    </span>
                                    <input type='text' className='form-control' value={this.state.GiaNhap}
                                        onChange={(e) => this.setState({ GiaNhap: e.target.value })} />
                                </div>
                                <div className='input-group mb-3'>
                                    {/* <span className='input-group-text'>
                                        Nhà cung cấp
                                    </span> */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Nhà cung cấp</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Nhà cung cấp"
                                            onChange={(e) => {
                                                this.setState({
                                                    Nhacungcap: e.target.value
                                                })
                                            }}
                                        >
                                            {
                                                APINhaCungCap.map(e =>
                                                    <MenuItem value={e.id}>{e.name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    {/* <select value={Nhacungcap} onChange={(e) => {
                                        this.setState({
                                            Nhacungcap: e.target.value
                                        })
                                    }} className="custom-select" style={{ width: "41%" }}>
                                        <option value={0}>Hãy chọn nhà cung cấp</option>
                                        {
                                            APINhaCungCap.map(e =>
                                                <option value={e.id}>{e.name}</option>
                                            )
                                        }
                                    </select> */}
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
                </div >
            </>
        )
    }
}



export default CRUDProductType;

