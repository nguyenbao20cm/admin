import * as React from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { result } from 'lodash';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
class CRUDProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductType: [],
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProduct: "",
            Description: "",
            price: 0,

            productTypeId: "",
            image: "",
            Iimage: "",
            ProductTypegetbyid: [], SKU: "", Disscount: "", Status: "", ProductType1: []
        }
    }

    refreshList() {
        const token = this.getToken();
        fetch(variable.API_URL + "Products/GetAllProduct")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data });
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
                this.setState({ ProductType1: data });
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

        this.setState({ image: e.target.files[0].name, Iimage: e.target.files[0] });

    }

    CreateClick() {
        if (this.state.SKU.length > 5) return alert("SKU không được vượt quá 5 ký tự");
        const optionProductType = []
        this.state.ProductType1.forEach(element => {
            optionProductType.push(element.id)
        });
        var a = false;
        optionProductType.forEach(element => {
            if (element == this.state.productTypeId) a = true;
        });
        if (a == false) return alert("ProductTypeId không tồn tại");;
        if (this.state.image == "") {
            alert("Chua Nhap Image");
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
                        status: this.state.Status == "True" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,

                        productTypeId: this.state.productTypeId,
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
                                            status: this.state.Status == "True" ? true : false,
                                            price: this.state.price,

                                            productTypeId: this.state.productTypeId,
                                            image: imagelName
                                        })
                                }).then(res => res.json())
                            }
                        });

                    }
                    if (result == "Thành công") {
                        alert(result);
                        window.location.reload(false);
                    }
                },
                    (error) => {
                        console.error(error)
                        alert("Failed");
                    });

        }






    }


    UpdateClick(id) {
        if (this.state.SKU.length > 5) return alert("SKU không được vượt quá 5 ký tự");
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
                        status: this.state.Status == "True" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,

                        productTypeId: this.state.productTypeId,
                        image: imagelName
                    })
            }).then(res => res.json())
                .then(result => {
                    alert(result);
                    if (result == "Thành công") {
                        window.location.reload(false);
                    }
                },
                    (error) => {
                        console.error(error)
                        alert("Failed");
                    });
        }
        else if (this.state.image == "") {
            alert("Chua Nhap Image");
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
                        status: this.state.Status == "True" ? true : false,
                        description: this.state.Description,
                        price: this.state.price,

                        productTypeId: this.state.productTypeId,
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
                    alert(result);
                    if (result == "Thành công") {
                        window.location.reload(false);
                    }
                },
                    (error) => {
                        console.error(error)
                        alert("Failed");
                    });

        }


    }
    DeleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variable.API_URL + "Products/DeleteProduct/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
                .then(result => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert("Failed");
                }
                )
        }
    }

    addClick() {
        this.setState({
            modelTitle: "Add Product",
            id: 0,
            Name: "",

            Description: "",
            price: 0,

            productTypeId: "",
            image: "",
        });
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Edit Product",
            id: dep.id,
            Name: dep.name,
            Status:
                dep.status == true ?
                    "True" : "False"
            ,
            Description: dep.description,
            price: dep.price,

            productTypeId: dep.productTypeId,
            image: dep.image,
        });
    }
    NextPage(id, npage) {
        console.log(npage)
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
            NameinputProduct: value.target.value
        });

    }

    CheckAll() {


        fetch(variable.API_URL + "Products/GetAllProduct")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data });
            })

    }
    CheckTrue() {

        fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data });
            })
    }
    CheckFalse() {
        fetch(variable.API_URL + "Products/GetAllProductStatusFalse")
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductType: data });
            })
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
            price,
            SKU,
            productTypeId,
            image, Status
        } = this.state;
        const options = ['True', 'False']
        const optionProductType = []
        ProductType1.forEach(element => {
            optionProductType.push(element.id)
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
                                    <label>Search by Id:</label>
                                    <div><input className="form-control w-100" type="text" onChange={(e) => this.ChangeNameinputProduct(e)} placeholder="Id" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <label>Status:</label>
                            <div className>
                                <input type="radio" id="All" name="fav_language" value="All" onClick={() => this.CheckAll()} />
                                <label for="All">All</label><br />
                                <input type="radio" id="True" name="fav_language" value="True" onClick={() => this.CheckTrue()} />
                                <label for="True">True</label><br />
                                <input type="radio" id="False" name="fav_language" value="False" onClick={() => this.CheckFalse()} />
                                <label for="False">False</label>
                            </div>
                        </div>
                    </div>

                </div>

                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Add Product
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
                                        SKU
                                    </th>
                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Price
                                    </th>


                                    <th>
                                        Image
                                    </th>
                                    <th>
                                        ProductTypeId
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {ProductType.filter((item) => {
                                    return this.state.NameinputProduct === ""
                                        ? item
                                        : item.id.toString().includes(this.state.NameinputProduct);
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
                                                {dep.price + "$"}
                                            </td>


                                            <td>
                                                <img style={{ width: 50 }} src={require('../../assets/images/products/' + dep.image)} />
                                            </td>
                                            <td>
                                                {dep.productTypeId}
                                            </td>
                                            <td>
                                                {dep.status == true ?
                                                    "True" : "False"
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
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                        </button>
                                    </div>
                                    <div className='modal-body'>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Name
                                            </span>
                                            <input type='text' className='form-control' value={Name}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />

                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                SKU
                                            </span>
                                            <input type='text' className='form-control' value={SKU}
                                                onChange={(e) => this.ChangeSKU(e)} />

                                        </div>
                                        <div class="form-group">
                                            <span className='input-group-text'>
                                                Description
                                            </span>
                                            <textarea class="form-control" id="message-text" value={Description} style={{ height: 152 }}
                                                onChange={(e) => this.ChangeProdcutDescription(e)}></textarea>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Price
                                            </span>
                                            <input type='text' className='form-control' value={price}
                                                onChange={(e) => this.ChangeProdcutPrice(e)} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Image
                                            </span>
                                            <input type='text' className='form-control' value={image}
                                                onChange={(e) => this.ChangeProdcutImage(e)} readOnly />
                                            <input type="file" id="img" name="img" accept="image/*" onChange={(e) => this.ChangeProdcutImage(e)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                ProductTypeId
                                            </span>
                                            <Autocomplete
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
                                                Status
                                            </span>
                                            <Autocomplete
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

                                    </div>
                                    <div class="modal-footer">
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
                                    <a href='#' className='page-link' onClick={() => this.PrePage(this.state.currentPage)}>Prev</a>
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
                                    <a href='#' className='page-link' onClick={() => this.NextPage(this.state.currentPage, npage)}>Next</a>
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
