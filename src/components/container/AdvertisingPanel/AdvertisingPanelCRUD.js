import * as React from 'react';
import { variable } from '../../../Variable';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Space, message } from 'antd';
class ReviewCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AdvertisingPanel: [],
            modelTitle: "",
            Name: "",
            id: 0,
            currentPage: 1,
            NameinputProductType: "", image: "", Iimage: "", Status: ""

        }
    }
    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList() {

        fetch(variable.API_URL + "AdvertisingPanels/GetAllAdvertisingPanel", {
            method: "GET",

        })
            .then(response => response.json())
            .then(data => {
                this.setState({ AdvertisingPanel: data });
            })
    }
    componentDidMount() {
        this.refreshList();
    }


    CreateClick() {
        if (this.state.image == "") {
            message.error("Chưa nhập Hình ảnh")
        } if (this.state.Status == "") {
            message.error("Chưa nhập trạng thái")
        } 
        else {
            const token = this.getToken();
            fetch(variable.API_URL + "AdvertisingPanels/CreateAdvertisingPanel", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
                body: JSON.stringify({

                    status: this.state.Status == "True" ? true : false,
                    image: this.state.image
                })

            }).then(res => res.json())
                .then(result => {
                    if (result == "Thành công") {
                        const token = this.getToken();
                        const response = fetch(
                            variable.API_URL + "AdvertisingPanels/GetAdvertisingPanelById/" + this.state.image, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'Authorization': `Bearer ${token.value}`
                            },
                        }
                        ).then((response) => response.json()).then(result => {
                            if (result.advertisingPanelID != null) {
                                const formData = new FormData()
                                const token = this.getToken();
                                var imagelName = result.advertisingPanelID + ".jpg"
                                formData.append("model", this.state.Iimage, imagelName)
                                fetch(variable.API_URL + "AdvertisingPanels/CreateImageAdvertisingPanel", {
                                    method: "POST",
                                    body: formData
                                }).then(res => res.json())
                                fetch(variable.API_URL + "AdvertisingPanels/UpdateAdvertisingPanel/" + result.advertisingPanelID, {
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        'Authorization': `Bearer ${token.value}`
                                    },
                                    body:
                                        JSON.stringify({
                                            image: imagelName,
                                            status: result.status,
                                          
                                        })
                                }).then(res => res.json())
                            }
                        });

                    }
                    if (result == "Thành công") {
                        message.success(result)
                        window.location.reload(false);
                    }
                },
                    (error) => {
                        console.error(error)
                        message.error("Failed")
                    });

        }

    }
    UpdateClick(id) {
        const token = this.getToken();
        var imagelName = id + ".jpg"
        if (this.state.image == imagelName) {
            fetch(variable.API_URL + "AdvertisingPanels/UpdateAdvertisingPanel/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
                body:
                
                JSON.stringify({
                    image: imagelName,
                    status: this.state.Status == "True" ? true : false,
                })
            }).then(res => res.json())
                .then(result => {
                    
                    if (result == "Thành công") {
                        message.success(result)
                        window.location.reload(false);
                    }
                    else
                        message.error(result)
                },
                    (error) => {
                      
                        message.error("Failed")
                    });
        }
        else if (this.state.image == "") {
            message.error("Chưa nhập hình ảnh")
        } else {
           
            const formData = new FormData()
            var imagelName = id + ".jpg"

            formData.append("model", this.state.Iimage, imagelName)

            fetch(variable.API_URL + "AdvertisingPanels/UpdateAdvertisingPanel/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
                body:
                    JSON.stringify({
                        image: imagelName,
                        status: this.state.Status == "True" ? true : false,
                    })
            }).then(res => res.json())
                .then(result => {
                    if (result === "Thành công") {
                        fetch(variable.API_URL + "AdvertisingPanels/CreateImageAdvertisingPanel", {
                            method: "POST",
                            body: formData
                        }).then(res => res.json())

                    }
                   
                    if (result == "Thành công") {
                        message.success(result)
                        window.location.reload(false);
                    }
                    else
                        message.error(result)
                },
                    (error) => {
                        console.error(error)
                        message.error("Failed")
                    });

        }

    }
    DeleteClick(id) {
        const token = this.getToken();
        if (window.confirm('Are you sure?')) {
            fetch(variable.API_URL + "AdvertisingPanels/DeleteAdvertisingPanel/" + id, {
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
                }, (error) => {
                    message.error("Failed")
                }
                )
        }
    }
    ChangeProdcutImage = (e) => {

        this.setState({ image: e.target.files[0].name, Iimage: e.target.files[0] });
    }

    addClick() {
        this.setState({
            modelTitle: "Add AdvertisingPanel",
            id: 0,
            Name: "",
            image: "",
            Status:"",
        });
    }
    EditClick(dep) {
        this.setState({
            modelTitle: "Edit AdvertisingPanel",
            id: dep.advertisingPanelID,
            Name: dep.name,
            image: dep.image,
            Status:
                dep.status == true ?
                    "True" : "False"
            ,
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

        fetch(variable.API_URL + "AdvertisingPanels/GetAllAdvertisingPanel", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ AdvertisingPanel: data });
            })
    }
    CheckTrue() {

        const token = this.getToken();

        fetch(variable.API_URL + "AdvertisingPanels/GetAllAdvertisingPanelStatusTrue", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ AdvertisingPanel: data, currentPage: 1 });
            })
    }
    CheckFalse() {
        const token = this.getToken();

        fetch(variable.API_URL + "AdvertisingPanels/GetAllAdvertisingPanelStatusFalse", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ AdvertisingPanel: data, currentPage: 1 });
            })


    }
    render() {

        const {
            AdvertisingPanel,
            modelTitle,
            id,
            Name, Status,
            currentPage,
            image
        } = this.state;
        const options = ['True', 'False']
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = AdvertisingPanel.slice(firstIndex, lastIndex);
        const npage = Math.ceil(AdvertisingPanel.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        return (
            <>
                <div style={{ display: "flex", }}>
                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "1000px" }}>
                        <div className="card-body" >
                            <div>
                                <div className="form-group">
                                    <label>Search by AdvertisingPanelId:</label>
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
                    Add AdvertisingPanel
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
                                        Image
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
                                {AdvertisingPanel
                                    .filter((item) => {
                                        return this.state.NameinputProductType === ""
                                            ? item
                                            : item.advertisingPanelID.toString().includes(this.state.NameinputProductType)
                                    }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr key={dep.advertisingPanelID}>
                                            <td>
                                                {dep.advertisingPanelID}
                                            </td>
                                            <td>
                                                <img style={{ width: 50 }} src={require('../../../assets/images/AdvertisingPanel/' + dep.image)} />
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
                                                <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.advertisingPanelID)}>
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
                                                Image
                                            </span>
                                            <input type='text' className='form-control' value={image}
                                                onChange={(e) => this.ChangeProdcutImage(e)} readOnly />
                                            <input type="file" id="img" name="img" accept="image/*" onChange={(e) => this.ChangeProdcutImage(e)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Status
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



export default ReviewCRUD;

