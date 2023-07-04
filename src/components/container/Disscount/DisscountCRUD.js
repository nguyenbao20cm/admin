import * as React from 'react';
import { variable } from '../../../Variable';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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


class ReviewCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Disscounts: [],
            modelTitle: "",
            Name: "",
            id: 0, nameDisscount: "",
            currentPage: 1,
            NameinputProductType: "",
            DisscountEdit: "",
            ProductId: "",
            Status: "",
            ProductType: [], open1: false, check: "", data: ""

        }
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Disscounts/GetAllDisscount", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },

        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Disscounts: data, currentPage: this.state.currentPage });
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
                this.setState({ ProductType: data });
            })
    }
    componentDidMount() {
        this.refreshList();
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
    PRID(a) {
        var b = this.state.ProductType.filter((item) => { return item.name == a ? item : null }).map((dep) => dep.id)
        return b[0]
    }
    CreateClick() {
        if (this.state.nameDisscount == "") return this.loi("Dữ liệu bị trống", "Hãy nhập lại")
        if (this.state.ProductId == "") return this.loi("Dữ liệu bị trống", "Hãy nhập lại")
        const token = this.getToken();
        fetch(variable.API_URL + "Disscounts/CreateDisscount", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },

            body: JSON.stringify({
                nameDisscount: this.state.nameDisscount == "10%" ? 10 : this.state.nameDisscount == "20%" ?
                    20 : this.state.nameDisscount == "30%" ? 30 : this.state.nameDisscount == "40%" ?
                        40 : this.state.nameDisscount == "50%" ? 50 :
                            this.state.nameDisscount == "60%" ? 60 :
                                this.state.nameDisscount == "70%" ? 70 :
                                    this.state.nameDisscount == "80%" ? 80 :
                                        this.state.nameDisscount == "90%" ? 90 : null
                ,
                ProductId: this.PRID(this.state.ProductId),
                status: true,
            })
        }).then(res => res.json())
            .then(result => {

                if (result == "Thành công") {
                    message.success("Thành công")
                    this.refreshList()
                    document.getElementById("closeModal").click()
                }
                else
                    this.loi(result, "")
            }, (error) => {
                this.loi("Đã xảy ra lỗi", "")
            });
    }
    UpdateClick(id) {
        const token = this.getToken();
        if (this.state.nameDisscount == "") return this.loi("Dữ liệu bị trống", "Hãy nhập lại")
        if (this.state.ProductId == "") return this.loi("Dữ liệu bị trống", "Hãy nhập lại")
        fetch(variable.API_URL + "Disscounts/UpdateDisscount/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                nameDisscount: this.state.nameDisscount == "10%" ? 10 : this.state.nameDisscount == "20%" ?
                    20 : this.state.nameDisscount == "30%" ? 30 : this.state.nameDisscount == "40%" ?
                        40 : this.state.nameDisscount == "50%" ? 50 :
                            this.state.nameDisscount == "60%" ? 60 :
                                this.state.nameDisscount == "70%" ? 70 :
                                    this.state.nameDisscount == "80%" ? 80 :
                                        this.state.nameDisscount == "90%" ? 90 : null
                ,
                ProductId: this.PRID(this.state.ProductId),
                status: true,
            })
        }).then(res => res.json())
            .then(result => {

                if (result == "Thành công") {
                    message.success(result)
                    this.refreshList()
                    document.getElementById("closeModal").click()
                }
                else
                    this.loi(result, "")
            }, (error) => {
                this.loi("Đã xảy ra lỗi", "")
            }
            )
    }
    DeleteClick() {
        const token = this.getToken();

        fetch(variable.API_URL + "Disscounts/DeleteDisscount/" + this.state.data, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(res => res.json())
            .then(result => {
                message.success(result)
                this.refreshList();
                this.setState({ open1: false })
            }, (error) => {
                this.loi("Đã xảy ra lỗi", "")
            }
            )

    }

    addClick() {
        this.setState({
            modelTitle: "Tạo mã giảm giá",
            id: 0,
            ProductId: "",
            nameDisscount: "", check: 0,

        });
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Chỉnh sửa",
            id: dep.id,
            check: 1,
            ProductId: dep.product.name,
            nameDisscount: dep.nameDisscount + "%",
            Giagoc: dep.product.price,
            GiaSale: Number(dep.product.price) * Number(dep.name),
        });
    }
    DeleteClick1(id) {
        this.setState({

            open1: true, data: id

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
            currentPage: 1
        });

    }
    ChangeDisscountEdit(value) {
        this.setState({
            DisscountEdit: value.target.value
        });

    }



    render() {

        const {
            Disscounts, nameDisscount,
            modelTitle,
            id, Status, ProductId, open1,
            Name, ProductType,
            currentPage, DisscountEdit, NameinputProductType

        } = this.state;
        const recordsPerPage = 5;
        const optionProductType = []
        const Sale = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"]
        ProductType.forEach(element => {
            optionProductType.push(element.name)
        });
        const options = ['True', 'False']
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Disscounts.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Disscounts.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
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
                    <DialogTitle>{"Bạn có chắc chắc muốn xóa"}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.DeleteClick()
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
                                    <label>Tìm kiếm theo tên sản phẩm</label>
                                    <div><input className="form-control w-100" value={NameinputProductType} type="text" onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Tên sản phẩm " />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="card" style={{ width: "135px" }}>
                            <div className="card-body">
                                <label>Status:</label>
                                <div className>
                                    <input type="radio" id="All" name="fav_language" value="All" onClick={() => this.CheckAll()} />
                                    <label for="All">Tất cả</label><br />
                                    <input type="radio" id="True" name="fav_language" value="True" onClick={() => this.CheckTrue()} />
                                    <label for="True">True</label><br />
                                    <input type="radio" id="False" name="fav_language" value="False" onClick={() => this.CheckFalse()} />
                                    <label for="False">False</label>
                                </div>
                            </div>
                        </div> */}

                </div>

                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Tạo giảm giá
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
                                        Giảm giá
                                    </th>
                                    <th>
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Giá gốc
                                    </th>
                                    <th>
                                        Giá sau khi giảm giá
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
                                {Disscounts
                                    .filter((item) => {
                                        return this.state.NameinputProductType === ""
                                            ? item
                                            : item.product.name.toString().includes(this.state.NameinputProductType)

                                    }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.nameDisscount}%
                                            </td>
                                            <td>
                                                {(dep.product).name}
                                            </td>
                                            <td>
                                                {VND.format((dep.product).price)}
                                            </td>
                                            <td>
                                                {

                                                    VND.format((dep.product).price - Number((dep.product).price * Number(dep.nameDisscount) / 100))
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
                                                <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick1(dep.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className='modal-title'>{modelTitle}</h5>
                                        <button type='button' id="closeModal" className='btn-close' data-bs-dismiss='modal' aria-label='Close'>

                                        </button>
                                    </div>
                                    <div className='modal-body'>
                                        <div className='input-group mb-3'>
                                            {/* <span className='input-group-text'>
                                                Giảm giá
                                            </span>
                                            <input type='text' className='form-control' value={DisscountEdit}
                                                onChange={(e) => this.ChangeDisscountEdit(e)} /> */}
                                            <span className='input-group-text'>
                                                Giảm giá
                                            </span>
                                            <Autocomplete
                                                value={nameDisscount}
                                                disableClearable
                                                onChange={(event, newValue) => {
                                                    this.setState({
                                                        nameDisscount: newValue
                                                    });
                                                }}

                                                options={Sale}
                                                style={{ width: 300 }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        // label="Pay"
                                                        variant="outlined" />}
                                            />



                                        </div>
                                        <div className='input-group mb-3'>


                                            <span className='input-group-text'>
                                                Tên sản phẩm
                                            </span>
                                            {this.state.check == 1 ?
                                                <Autocomplete
                                                    readOnly
                                                    value={ProductId}
                                                    disableClearable
                                                    onChange={(event, newValue) => {
                                                        this.setState({
                                                            ProductId: newValue
                                                        });
                                                    }}

                                                    options={optionProductType}
                                                    style={{ width: 300 }}
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            // label="Pay"
                                                            variant="outlined" />}
                                                />
                                                : <Autocomplete

                                                    value={ProductId}
                                                    disableClearable
                                                    onChange={(event, newValue) => {
                                                        this.setState({
                                                            ProductId: newValue
                                                        });
                                                    }}

                                                    options={optionProductType}
                                                    style={{ width: 300 }}
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            // label="Pay"
                                                            variant="outlined" />}
                                                />
                                            }
                                        </div>
                                        <div class="modal-footer">
                                            {id == 0 ?// eslint-disable-next-line
                                                <button type='button' className='btn btn-primary float-start' onClick={() => this.CreateClick()}>Tạo</button> : null
                                            }
                                            {id != 0 ?// eslint-disable-next-line
                                                <button type='button' className='btn btn-primary float-start' onClick={() => this.UpdateClick(this.state.id)}>Update</button> : null
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
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

                </Paper>
            </>
        )
    }
}



export default ReviewCRUD;

