import * as React from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { result } from 'lodash';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Space, message } from 'antd';
import { PrintDisabled } from '@mui/icons-material';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import { colors } from '@mui/material';
class CRUDProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductType: [],
            APIProduct: [], APIProductType:[],
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProduct: "",
            Description: "",
            price: 0,
            SKU: "",
            productTypeId: "",
            image: "", StatusCheck:"",
            Iimage: "", NameCheck:"",SKUCheck:"",
            ProductTypegetbyid: [], SKU: "", Disscount: "", Status: "", ProductType1: [],Trangthai:""
        }
    }
    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Products/GetAllProduct")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data, APIProduct: data });
            })
        fetch(variable.API_URL + "ProductTypes/GetAllProductType", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },

        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    APIProductType: data
                    , ProductType1: data,Trangthai:null
                   
                });
            })
    }
    refreshList1() {
        const token = this.getToken();
        fetch(variable.API_URL + "Products/GetAllProduct")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ProductType: data, currentPage: this.state.currentPage,Trangthai: null
                   
    });
            })
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    ChangeSKU = (e) => {
        this.setState({ SKU: e.target.value });
    }
    ChangeProdcutDescription = (e) => {
        this.setState({ Description: e.target.value });
    }
    ChangeProdcutPrice = (e) => {
        this.setState({ price: e.target.value });
    }

    ChangeDisscount = (e) => {
        this.setState({ Disscount: e.target.value });
    }
    ChangeProdcutProductTypeId = (e) => {
        this.setState({ productTypeId: e.target.value });
    }
    ChangeProdcutImage = (e) => {
        if (e.target.files[0] !=null)
        this.setState({ image: e.target.files[0].name, Iimage: e.target.files[0] });

    }
    PRID(a) {
        var b = this.state.ProductType1.filter((item) => { return item.name == a ? item : null }).map((dep) => dep.id)
      
        return b[0]
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
        laSoNguyenDuong(value) {
    return (Number.isInteger(value) && value > 0);
}
    CreateClick() {
       
        if (this.state.Name == "") return this.loi("Dữ liệu bị rỗng ", "Hãy nhập lại")
        if (this.state.Description == "") return this.loi("Miêu tả bị rỗng ", "Hãy nhập lại")
        if (this.state.price == "") return this.loi("Giá bán đang bị rỗng ", "Hãy nhập lại")
        if (this.state.Status == "") return this.loi("Dữ liệu trạng thái bị rỗng", "Hãy nhập lại")
        if (this.laSoNguyenDuong(Number(this.state.price))==false) return this.loi("Giá không hợp lệ", "Hãy nhập lại")
        
        if (this.state.SKU.length > 5) return this.loi("SKU không được vượt quá 5 ký tự", "Hãy nhập lại")
        if (this.state.SKU == "") return this.loi("SKU không được rỗng", "Hãy nhập lại")

      

        const optionProductType = []
        this.state.APIProductType.forEach(element => {
            optionProductType.push(element.name)
        });
        var a = false;
        optionProductType.forEach(element => {
            if (element == this.state.productTypeId) a = true;
        });
        if (a == false) return this.loi("Loại sản phẩm không tần tại", "Hãy nhập lại")
  
            const ProductCheck = []
           
            this.state.APIProduct.forEach(element => {
                ProductCheck.push(element.name)
            });
            var ab = false;
            ProductCheck.forEach(element => {
                if (element == this.state.Name) ab = true;
            });
            if (ab == true) return this.loi("Tên sản phẩm đã tồn tại", "Hãy nhập lại")
       
        const SKUCheck = []

        this.state.APIProduct.forEach(element => {
            SKUCheck.push(element.sku)
        });
        var abc = false;
        SKUCheck.forEach(element => {
            if (element == this.state.SKU) abc = true;
        });
        if (abc == true) return this.loi("SKU này đã tồn tại", "Hãy nhập lại")

        if (this.state.image == "") {
            return this.loi("Hình ảnh đang bị rỗng", "Hãy nhập lại")
        } else {
            // const formData = new FormData()
            // formData.append("model", this.state.Iimage)
            fetch(variable.API_URL + "Products/CreateProduct", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        name: this.state.Name,
                        sku: this.state.SKU,
                        status: this.state.Status == "Hiển thị" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,
                        productTypeId: this.PRID(this.state.productTypeId),
                        image: ""
                    })
            }).then(res => res.json())
                .then(result => {
                    if (result === "Thành công") {
                        const response = fetch(
                            variable.API_URL + "Products/GetByName/" + this.state.Name
                        ).then((response) => response.json()).then(result => {
                            if (result.name != null) {
                                const formData = new FormData()
                                var imagelName = result.id + ".jpg"
                                formData.append("model", this.state.Iimage, imagelName)
                                fetch(variable.API_URL + "Products/CreateImageProduct", {
                                    method: "POST",
                                    body: formData
                                }).then(res => res.json())
                                fetch(variable.API_URL + "Products/UpdateProduct/" + result.id, {
                                    method: "PUT",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body:
                                        JSON.stringify({
                                            name: this.state.Name,
                                            sku: this.state.SKU,
                                            description: this.state.Description,
                                            status: this.state.Status == "Hiển thị" ? true : false,
                                            price: this.state.price,

                                            productTypeId: this.PRID(this.state.productTypeId),
                                            image: imagelName
                                        })
                                }).then(res => res.json()).then((result) => {
                                    if (result == "Thành công") {
                                    message.success("Thành công")
                                        window.location.reload(false);
                                    document.getElementById("closeModal").click()}
                                })
                            }
                        });

                    }
                    else
                        this.loi(result, "")
                },
                    (error) => {
                        console.error(error)
                        this.loi("Đã có lỗi bạn hãy xem lại dữ liệu có đúng không", "")
                    });

        }
    }


    UpdateClick(id) {

        if (this.state.Name == "") return this.loi("Dữ liệu bị rỗng ", "Hãy nhập lại")
        if (this.state.Description == "") return this.loi("Miêu tả bị rỗng ", "Hãy nhập lại")
        if (this.state.price == "") return this.loi("Giá bán đang bị rỗng ", "Hãy nhập lại")
        if (this.state.Status == "") return this.loi("Dữ liệu trạng thái bị rỗng", "Hãy nhập lại")
   
        if (this.laSoNguyenDuong(Number(this.state.price)) == false) return this.loi("Giá không hợp lệ", "Hãy nhập lại")
       
        if (this.state.SKUCheck != this.state.SKU) {
            const ProductCheck = []

            this.state.APIProduct.forEach(element => {
                ProductCheck.push(element.sku)
            });
            var ab = false;
            ProductCheck.forEach(element => {
                if (element == this.state.SKU) ab = true;
            });
            if (ab == true) return this.loi("SKU này đã tồn tại", "Hãy nhập lại")
        }

        if (this.state.SKU.length > 5) return this.loi("SKU không được vượt quá 5 ký tự", "Hãy nhập lại")
        if (this.state.SKU == "") return this.loi("SKU không được rỗng", "Hãy nhập lại")
        const optionProductType = []
        this.state.APIProductType.forEach(element => {
            optionProductType.push(element.name)
        });
        var a = false;
        optionProductType.forEach(element => {
            if (element == this.state.productTypeId) a = true;
        });
        if (a == false) return this.loi("Loại sản phẩm không tần tại", "Hãy nhập lại")
 

        if (this.state.NameCheck != this.state.Name) {
            const ProductCheck = []
            console.log(this.state.APIProduct)
            this.state.APIProduct.forEach(element => {
                ProductCheck.push(element.name)
            });
            var ab = false;
            ProductCheck.forEach(element => {
                if (element == this.state.Name) ab = true;
            });
            if (ab == true) return this.loi("Tên sản phẩm đã tồn tại", "Hãy nhập lại")
        }
        
        if (this.state.image == "")
            return this.loi("Hình ảnh đang bị rỗng", "Hãy nhập lại")
        var imagelName = this.state.id + ".jpg"
        if (this.state.image == imagelName) {
            fetch(variable.API_URL + "Products/UpdateProduct/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        name: this.state.Name,
                        sku: this.state.SKU,
                        status: this.state.Status == "Hiển thị" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,
                        productTypeId: this.PRID(this.state.productTypeId),
                        image: imagelName
                    })
            }).then(res => res.json())
                .then(result => {
                    if (result == "Thành công") {
                       
                        this.state.Trangthai == true ? this.CheckTrue()
                            : this.state.Trangthai == false ? this.CheckFalse()
                                :
                                this.refreshList1()
                        document.getElementById("closeModal").click()
                        message.success("Thành công")
                    }
                    else
                        this.loi(result, "")
                },
                    (error) => {
                        
                        this.loi("Đã xảy ra lỗi", "")
                    });
        }
        else if (this.state.image == "") {
            message.error("Chưa nhập hình ảnh")
        } else {
            const formData = new FormData()
            var imagelName = this.state.id + ".jpg"

            formData.append("model", this.state.Iimage, imagelName)

            fetch(variable.API_URL + "Products/UpdateProduct/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        name: this.state.Name,
                        sku: this.state.SKU,
                        status: this.state.Status == "Hiển thị" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,
                        productTypeId: this.PRID(this.state.productTypeId),
                        image: imagelName
                    })
            }).then(res => res.json())
                .then(result => {
                    if (result === "Thành công") {
                        fetch(variable.API_URL + "Products/CreateImageProduct", {
                            method: "POST",
                            body: formData
                        }).then(res => res.json())

                    }
                    if (result == "Thành công") {
                       
                        window.location.reload(false);
                        message.success("Thành công")
                        document.getElementById("closeModal").click()
                    }
                    else
                        this.loi(result, "")
                },
                    (error) => {
                        console.error(error)
                        message.error("Failed")
                    });

        }


    }
    DeleteClick(id) {

        fetch(variable.API_URL + "Products/DeleteProduct/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(result => {
                message.success(result)
                this.refreshList1();
            }, (error) => {
                message.error("Failed")
            }
            )

    }

    addClick() {
        this.setState({
            modelTitle: "Thêm sản phẩm ",
            id: 0,
            Name: "",
            SKU: "",
            Description: "",
            price: 0,
      
            productTypeId: "",
            image: "",
        });
    }
    EditClick(dep) {
        this.setState({
            StatusCheck: dep.status == true ?
                "Hiển thị" : "Ẩn",
            NameCheck:dep.name,
            modelTitle: "Sửa sản phẩm",
            id: dep.id,
            Name: dep.name, SKUCheck:dep.sku,
            Status:
                dep.status == true ?
                    "Hiển thị" : "Ẩn"
            ,
            Description: dep.description,
            price: dep.price,
            SKU: dep.sku,
            productTypeId: dep.productType.name,
            image: dep.image,
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
    ChangeNameinputProduct(value) {
        this.setState({
            NameinputProduct: value.target.value,
            currentPage: 1 
        });

    }

    CheckAll() {


        fetch(variable.API_URL + "Products/GetAllProduct")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ProductType: data, Trangthai: null, currentPage: 1,
                    NameinputProduct: ""
});
            })

    }
    CheckTrue() {
        if (this.state.StatusCheck != this.state.Status) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.ProductType.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: true,
                        NameinputProduct: ""
                    });
                })
        }
        else {
            fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == false ? 1 : this.state.currentPage,
                        Trangthai: true,
                        NameinputProduct: ""
                    });
                })
        }
    }
    CheckFalse() {
        if (this.state.StatusCheck != this.state.Status)
        {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const a = this.state.ProductType.slice(firstIndex, lastIndex);
            fetch(variable.API_URL + "Products/GetAllProductStatusFalse")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 : a.length == 1 ? this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: false,
                        NameinputProduct: ""
                    });
                })
        }
        else {
            fetch(variable.API_URL + "Products/GetAllProductStatusFalse")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ProductType: data,
                        currentPage: this.state.Trangthai == null ? 1 : this.state.Trangthai == true ? 1 :  this.state.currentPage,
                        Trangthai: false,
                        NameinputProduct: ""
                    });
                })
        }
      
    }
    render() {

        const {
            ProductType,
            modelTitle,
            id,
            Name,
            currentPage,
            ProductTypegetbyid, Disscount, ProductType1,
            Description,
            price, NameinputProduct,
            SKU,
            productTypeId,
            image, Status
        } = this.state;
        const options = ["Hiển thị", "Ẩn"]
        const optionProductType = []
        ProductType1.forEach(element => {
            optionProductType.push(element.name)
        });
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = ProductType.slice(firstIndex, lastIndex);
        const npage = Math.ceil(ProductType.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>





                <div style={{ display: "flex" }}>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body" >
                            <div>
                                <div className="form-group">
                                    <label>Tìm kiếm theo tên sản phẩm</label>
                                    <div><input className="form-control w-100" type="text" value={NameinputProduct} onChange={(e) => this.ChangeNameinputProduct(e)} placeholder="Tên sản phẩm" />
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
                    Thêm sản phẩm
                </button>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        Id
                                    </th>
                                    <th>
                                        Mã SKU
                                    </th>
                                    <th>
                                        Tên sản phẩm
                                    </th>

                                    <th>
                                        Miêu tả
                                    </th>
                                    <th>
                                        Giá bán
                                    </th>


                                    <th>
                                        Ảnh
                                    </th>
                                    <th>
                                        Loại
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Sửa
                                    </th>
                                    <th>
                                        Ẩn
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {ProductType.filter((item) => {
                                    return this.state.NameinputProduct === ""
                                        ? item
                                        : item.name.toString().includes(this.state.NameinputProduct);
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr >
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.sku}
                                            </td>
                                            <td>
                                                {dep.name}
                                            </td>
                                            <td>
                                                {dep.description}
                                            </td>
                                            <td>
                                                {dep.price + " Đồng"}
                                            </td>


                                            <td>
                                                <img style={{ width: 50 }} src={require('../../assets/images/products/' + dep.image)} />
                                            </td>
                                            <td>
                                                {(dep.productType).name}
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
                                                Tên sản phẩm
                                            </span>
                                            <input type='text' className='form-control' value={Name}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />

                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Mã SKU
                                            </span>
                                            <input type='text' className='form-control' value={SKU}
                                                onChange={(e) => this.ChangeSKU(e)} />

                                        </div>
                                        <div class="form-group">
                                            <span className='input-group-text'>
                                                Miêu tả
                                            </span>
                                            <textarea class="form-control" id="message-text" value={Description} style={{ height: 152 }}
                                                onChange={(e) => this.ChangeProdcutDescription(e)}></textarea>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Giá bán
                                            </span>
                                            <input type='text' className='form-control' value={price}
                                                onChange={(e) => this.ChangeProdcutPrice(e)} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Ảnh
                                            </span>
                                            <input type='text' className='form-control' value={image}
                                                onChange={(e) => this.ChangeProdcutImage(e)} readOnly />
                                            <input type="file" id="img" name="img" accept="image/*" onChange={(e) => this.ChangeProdcutImage(e)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Loại
                                            </span>
                                            <Autocomplete
                                                disableClearable
                                                value={productTypeId}
                                                onChange={(event, newValue) => {
                                                    this.setState({
                                                        productTypeId: newValue
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



export default CRUDProduct;
