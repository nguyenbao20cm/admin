import * as React from 'react';
import { variable } from '../../../Variable';
import { Alert, Space, message } from 'antd';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import $ from "jquery"
class ReviewCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductSizes: [], ProductType: [], StatusCheck: "",
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProductType: "", Stock: "", Status: "", ProductId: "",
            IssuedDate: "", ImportPrice: ""
        }
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {

        const token = this.getToken();
        fetch(variable.API_URL + "ProductSizes/GetAllProductSize", {
            method: "GET",

        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductSizes: data });
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


    CreateClick() {
        const token = this.getToken();
        fetch(variable.API_URL + "ProductSizes/CreateProductSize", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                importPrice: this.state.ImportPrice,
                // IssuedDate: Date.now(),
                name: this.state.Name,
                stock: this.state.Stock,
                ProductId: this.state.ProductId,
                status: this.state.Status == "Hiển thị" ? true : false,
            })
        }).then(res => res.json())
            .then(result => {

                if (result == "Thành công") {
                    message.success(result)
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
        if (this.state.Name == "") return message.error("Không được bỏ trống")
        fetch(variable.API_URL + "ProductSizes/UpdateProductSize/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify
                ({
                    importPrice: this.state.ImportPrice,
                    name: this.state.Name,
                    stock: this.state.Stock,
                    ProductId: this.state.ProductId,
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
            }
            )
    }
    DeleteClick(id) {
        const token = this.getToken();

        fetch(variable.API_URL + "ProductSizes/DeleteProductSize/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công")
                    this.refreshList();
                }
                else
                    message.error(result)

            }, (error) => {
                message.error("Failed")
            }
            )

    }

    addClick() {
        this.setState({
            modelTitle: "Thêm Size sản phẩm",
            id: 0,
            Name: "",
            ProductId: "",
            Status: "",
            Stock: 0, ImportPrice: 0,
        });
    }
    EditClick(dep) {
        this.setState({
            StatusCheck: dep.status == true ?
                "Hiển thị" : "Ẩn",
            modelTitle: "Sửa Size sản phẩm",
            id: dep.id,
            Name: dep.name,
            ProductId: dep.productId,
            Status:
                dep.status == true ?
                    "Hiển thị" : "Ẩn"
            ,
            ImportPrice: dep.importPrice,
            Stock: dep.stock,
        });
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
    ChangeProdcutTypeName(value) {
        this.setState({
            Name: value.target.value
        });

    }
    ChangeStock(value) {
        this.setState({
            Stock: value.target.value
        });

    }
    ChangeImportPrice(value) {
        this.setState({
            ImportPrice: value.target.value
        });

    }
    //0 all 1 false 2 true
    CheckAll() {
        const token = this.getToken();
        fetch(variable.API_URL + "ProductSizes/GetAllProductSize", {
            method: "GET",

        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ProductSizes: data, Trangthai: null,
                    NameinputProductType: ""
                });
            })
    }
    CheckTrue() {
        if (this.state.StatusCheck != this.state.Status) {
            const token = this.getToken();
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.ProductSizes.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "ProductSizes/GetAllProductSizeStatusTrue", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductSizes: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: true, NameinputProductType: ""
                    });
                })
        }
        else {
            const token = this.getToken();
            fetch(variable.API_URL + "ProductSizes/GetAllProductSizeStatusTrue", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductSizes: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : this.state.currentPage,
                        Trangthai: true, NameinputProductType: ""
                    });
                })
        }
    }
    CheckFalse() {
        if (this.state.StatusCheck != this.state.Status) {
            const token = this.getToken();
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.ProductSizes.slice(firstIndex, lastIndex);
            console.log(a.length)
            fetch(variable.API_URL + "ProductSizes/GetAllProductSizeStatusFalse", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductSizes: data
                        , currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: false, NameinputProductType: ""
                    });
                })
        }
        else {
            const token = this.getToken();
            fetch(variable.API_URL + "ProductSizes/GetAllProductSizeStatusFalse", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductSizes: data
                        , currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : this.state.currentPage,
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
    render() {

        const {
            ProductSizes,
            modelTitle,
            id,
            Name,
            currentPage, ProductType,
            Stock,
            ProductId, NameinputProductType,
            Status, IssuedDate, ImportPrice
        } = this.state;
        const options = ['Hiển thị', 'Ẩn']
        const optionProductType = []
        ProductType.forEach(element => {
            optionProductType.push(element.id)
        });
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = ProductSizes.slice(firstIndex, lastIndex);
        const npage = Math.ceil(ProductSizes.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>

                <div style={{ display: "flex", }}>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body" >
                            <div>
                                <div className="form-group">
                                    <label>Tìm kiếm Size theo tên sản phẩm</label>
                                    <div><input className="form-control w-100" type="text" value={NameinputProductType} onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Tên sản phẩm" />
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
                    Thêm Size sản phẩm
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
                                        Size
                                    </th>
                                    <th>
                                        Của sản phẩm
                                    </th>
                                    <th>
                                        Số lượng kho
                                    </th>
                                    <th>
                                        Ngày nhập
                                    </th>
                                    <th>
                                        Giá nhập
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
                                {ProductSizes
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
                                                {dep.name}
                                            </td>
                                            <td>
                                                {dep.product.name}
                                            </td>
                                            <td>
                                                {dep.stock}
                                            </td>
                                            <td>
                                                {
                                                    this.DatetimeFormat(dep.issuedDate)
                                                }
                                            </td>
                                            <td>
                                                {dep.importPrice + " Đồng"}
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
                                                <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.reviewId)}>
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
                                        <button id="closeModal" type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                        </button>

                                    </div>
                                    <div className='modal-body'>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Size
                                            </span>
                                            <input type='text' className='form-control' value={Name}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Của sản phẩm
                                            </span>
                                            <Autocomplete
                                                disableClearable
                                                value={ProductId}
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
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Số lương kho
                                            </span>
                                            <input type='text' className='form-control' value={Stock}
                                                onChange={(e) => this.ChangeStock(e)} />
                                            <span className='input-group-text'>
                                                Giá nhập
                                            </span>
                                            <input type='text' className='form-control' value={ImportPrice}
                                                onChange={(e) => this.ChangeImportPrice(e)} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Trạng thái
                                            </span>
                                            <Autocomplete
                                                disableClearable
                                                value={Status}
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
                                        {id == 0 ?// eslint-disable-next-line
                                            <button type='button' className='btn btn-primary float-start' onClick={() => this.CreateClick()}>Create</button> : null
                                        }
                                        {id != 0 ?// eslint-disable-next-line
                                            <button type='button' className='btn btn-primary float-start' onClick={() => this.UpdateClick(this.state.id)}>Update</button> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
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

                </Paper>
            </>
        )
    }
}



export default ReviewCRUD;

