import React, { lazy } from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import { Login } from '@mui/icons-material';
import { isNull } from 'lodash';
const FullLayout = Loadable(lazy(() => import('../../layouts/full/FullLayout')));

class InvoiceCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Invoice: [],
            modelTitle: "",
            id: 0,
            Code: "",
            AccountId: 0,
            currentPage: 1,
            IssuedDate: "",
            ShippingAddress: "",
            ShippingPhone: 0,
            Total: 0,
            Status: "",
            Pay: "",
            OrderStatus: "",
            DetailsInvoice: [],
            totalDetailInvoice: 0,
            ChangeId: "",
            startDate: "",
            endDate: ""
        }
    }

    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();

        fetch(variable.API_URL + "Inovices/GetAllInovice", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })

            .then(response => response.json())
            .then(data => {
                this.setState({ Invoice: data });
            })
    }
    componentDidMount() {
        this.refreshList();
    }
    ChangeProdcutTypeAccountId = (e) => {
        this.setState({ AccountId: e.target.value });
    }
    ChangeProdcutIssuedDate = (e) => {
        this.setState({ IssuedDate: e.target.value });
    }
    ChangeProdcutShippingAddress = (e) => {
        this.setState({ ShippingAddress: e.target.value });
    }
    ChangeProdcutShippingPhone = (e) => {
        this.setState({ ShippingPhone: e.target.value });
    }
    ChangeProdcutStatus = (e) => {
        this.setState({ Status: e.target.value });
    }
    ChangeProdcutPay = (e) => {
        this.setState({ Pay: e.target.value });
    }
    ChangeProdcutOrderStatus = (e) => {

        this.setState({ OrderStatus: e.target.value });

    }

    CreateClick() {
        if (this.state.image == "") {
            alert("Chua Nhap Image");
        } else {
            const formData = new FormData()
            var imagelName = this.state.sku + ".jpg"

            formData.append("model", this.state.Iimage, imagelName)
            fetch(variable.API_URL + "Products/CreateProduct", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        sku: this.state.sku,
                        name: this.state.Name,
                        description: this.state.Description,
                        price: this.state.price,
                        stock: this.state.stock,
                        productTypeId: this.state.productTypeId,
                        image: imagelName
                    })
            }).then(res => res.json())
                .then(result => {
                    if (result === true) {
                        fetch(variable.API_URL + "Products/CreateImageProduct", {
                            method: "POST",
                            body: formData
                        }).then(res => res.json())
                    }
                    alert(result);
                    this.refreshList();
                },
                    (error) => {

                        alert("Failed");
                    });
            this.refreshList();
            window.location.reload(false);
        }


    }


    UpdateClick(id) {
        fetch(variable.API_URL + "ProductTypes/UpdateProductType/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.Name })
        }).then(res => res.json())
            .then(result => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert("Failed");
            }
            )
    }
    DeleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variable.API_URL + "ProductTypes/DeleteProductType/" + id, {
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

    DetailsClick(dep) {
        const token = this.getToken();

        fetch(variable.API_URL + "InvoiceDetails/GetAllInvoiceDetails/" + dep.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })

            .then(response => response.json())
            .then(data => {
                this.setState({ DetailsInvoice: data });
            })
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Edit Invoice",
            Code: dep.Code,
            AccountId: dep.AccountId,
            Total: dep.Total,
            ShippingPhone: dep.ShippingPhone,
            IssuedDate: dep.IssuedDate,
            Pay: dep.Pay,
            ShippingAddress: dep.ShippingAddress,
            OrderStatus: dep.OrderStatus,
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
    total(data) {
        var a = 0;
        data.map(dep =>
            a = a + dep.unitPrice * dep.quantity
        )
        return a;
    }
    ChangeId(value) {
        this.setState({
            ChangeId: value.target.value
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
    ApplyClick() {
        const token = this.getToken();


        fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate+","+this.state.endDate, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Invoice: data });
            })
    }
    render() {

        const {
            Invoice,
            modelTitle,
            Code,
            id,
            AccountId,
            currentPage,
            IssuedDate,
            ShippingAddress,
            ShippingPhone,
            Total,
            Status,
            Pay,
            OrderStatus,
            DetailsInvoice,
            totalDetailInvoice
        } = this.state;
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Invoice.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Invoice.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>
                <div style={{ display: "flex" }}>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="form-group">
                                    <label>Date from - to:</label>
                                    <div>
                                        <input id="dates-range" className="form-control flatpickr-input"
                                            type="datetime-local" onChange={(e) => this.ChangeStartDate(e)} />
                                    </div>

                                </div>

                                <div className="form-group" >

                                    <div>
                                        <input id="dates-range" className="form-control flatpickr-input"
                                            type="datetime-local" onChange={(e) => this.ChangeEndDate(e)} />
                                    </div>
                                    <button type='button' className='btn btn-primary m-2 float-end'
                                        onClick={() => this.ApplyClick()}>
                                        Apply
                                    </button>
                                </div>



                            </div>
                        </div>

                    </div>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Search by Id:</label>
                                <div><input className="form-control w-100" onChange={(e) => this.ChangeId(e)} type="text" placeholder="Id" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                    <div>

                        {/* <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                        onClick={() => this.addClick()}>
                        Add Invoice
                    </button> */}
                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        Id
                                    </th>
                                    <th>
                                        AccountId
                                    </th>
                                    <th>
                                        IssuedDate
                                    </th>
                                    <th>
                                        ShippingAddress
                                    </th>
                                    <th>
                                        ShippingPhone
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Pay
                                    </th>
                                    <th>
                                        OrderStatus
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Details
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {a.filter((item) => {
                                    return this.state.ChangeId.toLowerCase() === ""
                                        ? item : item.id.toString().includes(this.state.ChangeId)
                                })
                                    .map(dep =>
                                        <tr>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.accountId}
                                            </td>
                                            <td>
                                                {dep.issuedDate}
                                            </td>
                                            <td>
                                                {dep.shippingAddress}
                                            </td>
                                            <td>
                                                {dep.shippingPhone}
                                            </td>
                                            <td>
                                                {dep.total}
                                            </td>
                                            <td>
                                                {dep.status == true ?
                                                    "True" : "False"
                                                }
                                            </td>
                                            <td>
                                                {dep.pay == true ?
                                                    "True" : "False"
                                                }
                                            </td>
                                            <td>

                                                {
                                                    dep.orderStatus == 1 ? "Chưa xác nhận" : dep.orderStatus == 2 ? "Đang chuẩn bị" : dep.orderStatus == 3 ? "Đang giao" : dep.orderStatus == 4 ? "Đã hủy" : dep.orderStatus == 5 ? "Hoàn tất" : isNull
                                                }
                                            </td>
                                            {/* //1 chưa xác nhận //2 la chua đang chuẩn bị //3 đang giao//6 đã giao//4 đã hủy,//5hoàn tất */}
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
                                                <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModalCenter'
                                                    onClick={() => this.DetailsClick(dep)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /> <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /> </svg>
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

                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Details Invoice</h5>
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <table id="example" className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        ProductId
                                                    </th>
                                                    <th>
                                                        Quantity
                                                    </th>
                                                    <th>
                                                        UnitPrice
                                                    </th>
                                                    <th>
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {DetailsInvoice.map(dep =>

                                                    <tr >
                                                        <td>
                                                            {dep.productId}
                                                        </td>
                                                        <td>
                                                            {dep.quantity}
                                                        </td>
                                                        <td>
                                                            {dep.unitPrice}
                                                        </td>
                                                        <td>
                                                            {dep.unitPrice * dep.quantity}
                                                        </td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <h4>Total:{this.total(DetailsInvoice)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                Code
                                            </span>
                                            <input type='text' className='form-control' value={Code}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />
                                            <span className='input-group-text'>
                                                AccountId
                                            </span>
                                            <input type='text' className='form-control' value={AccountId}
                                                onChange={(e) => this.ChangeProdcutSku(e)} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                IssuedDate
                                            </span>
                                            <input type='text' className='form-control' value={IssuedDate}
                                                onChange={(e) => this.ChangeProdcutDescription(e)} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                ShippingAddress
                                            </span>
                                            <input type='text' className='form-control' value={ShippingAddress}
                                                onChange={(e) => this.ChangeProdcutPrice(e)} />
                                            <span className='input-group-text'>
                                                ShippingPhone
                                            </span>
                                            <input type='text' className='form-control' value={ShippingPhone}
                                                onChange={(e) => this.ChangeProdcutStock(e)} />
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Total
                                            </span>
                                            <input type='text' className='form-control' value={Total}
                                                onChange={(e) => this.ChangeProdcutStock(e)} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Status
                                            </span>
                                            <input type='text' className='form-control' value={Status}
                                                onChange={(e) => this.ChangeProdcutProductTypeId(e)} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Pay
                                            </span>
                                            <input type='text' className='form-control' value={Status}
                                                onChange={(e) => this.ChangeProdcutProductTypeId(e)} />
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                OrderStatus
                                            </span>
                                            <input type='text' className='form-control' value={OrderStatus}
                                                onChange={(e) => this.ChangeProdcutProductTypeId(e)} />
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



export default InvoiceCRUD;

