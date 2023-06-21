import * as React from 'react';
import { variable } from '../../../Variable';

import Paper from '@mui/material/Paper';
import { Alert, Space, message } from 'antd';

class ReviewCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ReviewList: [],
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProductType: ""

        }
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {
        const token = this.getToken();

        fetch(variable.API_URL + "Reviews/GetAllReview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReviewList: data });
            })
    }
    componentDidMount() {
        this.refreshList();
    }


    CreateClick() {
        fetch(variable.API_URL + "ProductTypes/CreateProductType", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.Name })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công")
                    window.location.reload(false);
                }
                else
                    message.error(result)
            }, (error) => {
                message.error("Failed")
            });
    }
    UpdateClick(id) {
        if (this.state.Name == "") return message.error("Không được bỏ trống")
        fetch(variable.API_URL + "ProductTypes/UpdateProductType/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.Name })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công")
                    window.location.reload(false);
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
        if (window.confirm('Are you sure?')) {
            fetch(variable.API_URL + "Reviews/DeleteReviewByAdmin/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            }).then(res => res.json())
                .then(result => {
                    if (result == "Thành công") {
                        message.success("Thành công")
                        this.refreshList()
                    }
                    else
                        message.error(result)
                   
                }, (error) => {
                    message.error("Failed")
                }
                )
        }
    }

    addClick() {
        this.setState({
            modelTitle: "Add ProductType",
            id: 0,
            Name: ""
        });
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Edit ProductType",
            id: dep.id,
            Name: dep.name
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
    //0 all 1 false 2 true
    CheckAll() {

        const token = this.getToken();

        fetch(variable.API_URL + "Reviews/GetAllReview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReviewList: data });
            })
    }
    CheckTrue() {

        const token = this.getToken();

        fetch(variable.API_URL + "Reviews/GetAllReviewStatusTrue", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReviewList: data, currentPage: 1 });
            })
    }
    CheckFalse() {
        const token = this.getToken();

        fetch(variable.API_URL + "Reviews/GetAllReviewStatusFalse", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReviewList: data, currentPage: 1 });
            })


    }
    render() {

        const {
            ReviewList,
            modelTitle,
            id,
            Name,
            currentPage,

        } = this.state;
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = ReviewList.slice(firstIndex, lastIndex);
        const npage = Math.ceil(ReviewList.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>
                <div style={{ display: "flex", }}>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body" >
                            <div>
                                <div className="form-group">
                                    <label>Tìm kiếm bình luận theo tên sản phẩm:</label>
                                    <div><input className="form-control w-100" type="text" onChange={(e) => this.ChangeNameinputProductType(e)} placeholder="Id" />
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

                {/* <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#exampleModal'
                    onClick={() => this.addClick()}>
                    Add Review
                </button> */}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                    <div>


                        <table id="example" className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Của sản phẩm
                                    </th>
                                    <th>
                                        Của tài khoản ID
                                    </th>
                                    <th>
                                        Nội dung
                                    </th>
                                    <th>
                                        Ngày tạo
                                    </th>
                                    <th>
                                        Sao đánh giá
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>

                                    <th>
                                        Ẩn
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ReviewList
                                    .filter((item) => {
                                        return this.state.NameinputProductType === ""
                                            ? item
                                            : item.productId.toString().includes(this.state.NameinputProductType)
                                    }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.reviewId}>
                                            <td>
                                                {dep.reviewId}
                                            </td>
                                            <td>
                                                {dep.productId}
                                            </td>
                                            <td>
                                                {dep.accountId}
                                            </td>
                                            <td>
                                                {dep.content}
                                            </td>
                                            <td>
                                                {dep.dateTime}
                                            </td>
                                            <td>
                                                {dep.star}
                                            </td>
                                            <td>

                                                {dep.status == true ?
                                                    "True" : "False"
                                                }
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
                                                Content
                                            </span>
                                            <input type='text' className='form-control' value={Name}
                                                onChange={(e) => this.ChangeProdcutTypeName(e)} />
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

