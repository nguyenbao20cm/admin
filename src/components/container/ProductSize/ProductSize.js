import * as React from 'react';
import { variable } from '../../../Variable';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

class ReviewCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductSizes: [], ProductType:[],
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProductType: "", Stock: "", Status: "", ProductId:"",
            

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
                name: this.state.Name,
                stock: this.state.stock,
                ProductId:this.state.ProductId,
                status: this.state.Status == "True" ? true : false,
            })
        }).then(res => res.json())
            .then(result => {
                alert(result);
                if (result == "Thành công") {
                    window.location.reload(false);
                }
            }, (error) => {
                alert("Failed");
            });
    }
    UpdateClick(id) {
        const token = this.getToken();
        if (this.state.Name == "") return alert("Không được bỏ trống");
        fetch(variable.API_URL + "ProductSizes/UpdateProductSize/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify
            ({
                name: this.state.Name,
                stock: this.state.stock,
                ProductId: this.state.ProductId,
                status: this.state.Status == "True" ? true : false,
            })
        }).then(res => res.json())
            .then(result => {
                alert(result);
                if (result == "Thành công") {
                    window.location.reload(false);
                }
            }, (error) => {
                alert("Failed");
            }
            )
    }
    DeleteClick(id) {
        const token = this.getToken();
        if (window.confirm('Are you sure?')) {
            fetch(variable.API_URL + "ProductSizes/DeleteProductSize/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
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
            modelTitle: "Add ProductSize",
            id: 0,
            Name: ""
        });
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Edit ProductSize",
            id: dep.id,
            Name: dep.name,
            ProductId: dep.productId,
            Status:
                dep.status == true ?
                    "True" : "False"
            ,
            Stock: this.state.stock,
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
            NameinputProductType: value.target.value
        });

    }
    //0 all 1 false 2 true
    CheckAll() {

        const token = this.getToken();

        fetch(variable.API_URL + "ProductSizes/GetAllReview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductSizes: data });
            })
    }
    CheckTrue() {

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
                this.setState({ ProductSizes: data });
            })
    }
    CheckFalse() {
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
                this.setState({ ProductSizes: data });
            })


    }
    render() {

        const {
            ProductSizes,
            modelTitle,
            id,
            Name,
            currentPage, ProductType,
            Stock,
            ProductId,
            Status,
        } = this.state;
        const recordsPerPage = 5; const options = ['True', 'False']
        const optionProductType = []
        ProductType.forEach(element => {
            optionProductType.push(element.id)
        });
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
                                    <label>Search by ProductId:</label>
                                    <div><input className="form-control w-100" type="text" onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Id" />
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
                    Add ProductSize
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
                                        Name
                                    </th>
                                    <th>
                                        ProductId 
                                    </th>
                                    <th>
                                        Stock
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
                                {ProductSizes
                                    .filter((item) => {
                                        return this.state.NameinputProductType === ""
                                            ? item.slice(firstIndex, lastIndex)
                                            : item.productId.toString().includes(this.state.NameinputProductType).slice(firstIndex, lastIndex);
                                    })
                                    .map(dep =>
                                        <tr key={dep.id}>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.name}
                                            </td>
                                            <td>
                                                {dep.productId}
                                            </td>
                                            <td>
                                                {dep.stock}
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
                                                ProductId
                                            </span>
                                            <Autocomplete
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
                                                Stock
                                            </span>
                                            <input type='text' className='form-control' value={Stock}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />
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



export default ReviewCRUD;

