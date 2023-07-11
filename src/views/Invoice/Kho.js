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

import CountUp from 'react-countup';

class CRUDProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductType: [], id1: "", endDate: "",
            modelTitle: "",
            Name: "", startDate: "",
            id: 0, StatusCheck: "", value1: "",
            currentPage: 1,
            NameinputProductType: "", Status: "", Trangthai: "", open1: false, APIProduct: []

        }

    }

    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "KhoHang/GetAllKhoHang", {
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

    DeleteClick(dep) {
        this.setState({ open1: true, id1: dep })
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
    DeleteClick1() {

        fetch(variable.API_URL + "BrandProducts/DeleteBrandProducts/" + this.state.id1, {
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
    ApplyClick() {
        const token = this.getToken();
        if (this.state.startDate == "") return message.warning("Dữ liệu bị trống")
        if (this.state.endDate == "") return message.warning("Dữ liệu bị trống")
        fetch(variable.API_URL + "VnPayBill/GetVNBillFilter/" + this.state.startDate + "," + this.state.endDate, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data, currentPage: 1 });
            })


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
    DatetimeFormat(e) {
        const abc = new Date(e)
        var day = abc.getDate() + "/";
        var month = abc.getMonth() + 1 + "/";
        var year = abc.getFullYear()
        let format4 = day + month + year;
        return format4;
    }
    datetimeformat(datetimeString) {
        const year = datetimeString.slice(0, 4);
        const month = datetimeString.slice(4, 6);
        const day = datetimeString.slice(6, 8);
        const hour = datetimeString.slice(8, 10);
        const minute = datetimeString.slice(10, 12);
        const second = datetimeString.slice(12, 14);
        const a = day + "/" + month + "/" + year + "/" + hour + ":" + minute;
        return a
    }
    render() {

        const {
            ProductType, APIProduct,
            modelTitle,
            id, NameinputProductType,
            Name, value1,
            currentPage, open1,
            Status,
        } = this.state;
        const OPtionProduct = APIProduct.map((dep) => ({
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
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "2000px" }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tìm kiếm theo sản phẩm:</label>
                                <Autocomplete
                                    getOptionLabel={(OPtionProduct) => OPtionProduct.nameProduct}
                                    getOptionSelected={(option, value) => option.nameProduct === value.nameProduct}
                                    disableClearable
                                    // value={Nhacungcap}
                                    onChange={(event, newValue) => {
                                        this.setState({
                                            value1: newValue.id
                                        })
                                    }}
                                    options={OPtionProduct}
                                    style={{ width: 300 }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            // label="Pay"
                                            variant="outlined" label="Tên sản phẩm" />}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Size
                                    </th>
                                    <th>
                                        Số lượng kho
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ProductType.filter((item) => {
                                    return this.state.value1 === ""
                                        ? item
                                        : item.id.toString().includes(this.state.value1);
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {((dep.productSize).product).name}
                                            </td>
                                            <td>
                                                {(dep.productSize).name}
                                            </td>

                                            <td>
                                                <CountUp delay={0.4} end={dep.stock} duration={0.6} />
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

                </Paper >
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
                                        Tên thương hiệu
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

