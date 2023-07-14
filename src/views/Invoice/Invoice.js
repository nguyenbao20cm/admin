import React, { lazy } from 'react';
import { variable } from '../../Variable';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import { ConstructionOutlined, Login } from '@mui/icons-material';
import { Alert, Space, message } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "./Invoice.css"
import CountUp from 'react-countup';
import 'sweetalert2/src/sweetalert2.scss'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { result } from 'lodash'; import { Select } from 'antd';
import { saveAs } from 'file-saver';
import {
    IconReport,
} from '@tabler/icons';



class InvoiceCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Invoice: [], APIInvoice: [],
            modelTitle: "",
            id: 0,
            Code: "",
            AccountId: 0,
            currentPage: 1, checkTrangthai: "",
            IssuedDate: "",
            ShippingAddress: "",
            ShippingPhone: "",
            Total: 0,
            Status: "", APdungCheck: false,
            Pay: "",
            OrderStatus: "",
            DetailsInvoice: [],
            totalDetailInvoice: 0,
            ChangeId: "",
            startDate: "",
            endDate: "",
            value: "", value: "", ID: "", open: false, data: "", open1: false, Trangthai: "", phiship: "", Giamgia: ""
        }
    }

    getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    refreshList1() {
        const token = this.getToken();
        document.getElementById("All1").checked = false;
        document.getElementById("All2").checked = false;
        document.getElementById("All3").checked = false;
        document.getElementById("All4").checked = false;
        document.getElementById("All5").checked = false;

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
                this.setState({ currentPage: 1, Invoice: data, APIInvoice: data });
            })
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
                this.setState({ Invoice: data, APIInvoice: data, currentPage: this.state.currentPage, Trangthai: null });
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
            message.error("Chưa nhập hình ảnh")
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
                    if (result == "Thành công") {
                        message.success("Thành công")
                        this.state.Trangthai == true ? this.CheckTrue()
                            : this.state.Trangthai == false ? this.CheckFalse()
                                :
                                this.refreshList()
                    }
                    else
                        message.error(result)

                },
                    (error) => {

                        message.error("Failed")
                    });
            this.refreshList();

        }


    }


    UpdateClick() {
        if (this.state.ShippingAddress == "") return this.loi("Địa chỉ bị rỗng ", "Hãy nhập lại")
        if (this.state.ShippingPhone == "") return this.loi("SĐT bị rỗng ", "Hãy nhập lại")
        if (this.state.ShippingPhone.length > 10) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        if (this.state.ShippingPhone.length < 0) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        if (Number.isInteger(Number(this.state.ShippingPhone)) == false) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        // if (this.state.Pay == "") return this.loi("Trạng thái bị rỗng ", "Hãy nhập lại")
        if (this.state.OrderStatus == "") return this.loi("Dữ liệu trạng thái bị sai", "Hãy nhập lại")
        if (this.state.OrderStatus == null) return this.loi("Dữ liệu trạng thái bị sai", "Hãy nhập lại")
        const token = this.getToken();
        fetch(variable.API_URL + "Inovices/UpdateInovice/" + this.state.data, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                shippingphone: this.state.ShippingPhone,
                shippingadress: this.state.ShippingAddress,
                // pay: this.state.Pay == "Đã thanh toán" ? true : false,
                orderStatus: this.state.OrderStatus == "Chưa xác nhận" ? 1 : this.state.OrderStatus == "Đang chuẩn bị" ? 2 : this.state.OrderStatus == "Đang giao" ? 3 : this.state.OrderStatus == "Đã hủy" ? 4 : this.state.OrderStatus == "Hoàn tất" ? 5 : this.state.OrderStatus == "Đã giao" ? 6 : null,

            })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công")
                    this.state.Trangthai == "HUY" ? this.CheckHuy()
                        : this.state.Trangthai == "HT" ? this.CheckHT()
                            : this.state.Trangthai == "CXN" ? this.CheckCXN()
                                : this.state.Trangthai == "CB" ? this.CheckCB() :
                                    this.state.Trangthai == "DG" ? this.CheckDG()
                                        : this.state.Trangthai == "DangG" ? this.CheckDangG() :
                                            this.refreshList()
                    this.setState({ open1: false, })
                    this.setState({ open: false })
                    document.getElementById("closeModal").click()
                }
                else
                    message.error(result)
            }, (error) => {
                message.error("Failed")
            }
            )

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
    ReportPDF(dep) {
        const token = this.getToken();
        fetch(variable.API_URL + "Inovices/GeneratePDF/" + dep.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            responseType: 'blob',
        }).then(res => res.blob())
            .then(blob => {
                saveAs(blob, 'HoaDonBan#' + dep.id + '.pdf');
            })
    }
    UpdateClick1(id) {
        if (this.state.ShippingAddress == "") return this.loi("Địa chỉ bị rỗng ", "Hãy nhập lại")
        if (this.state.ShippingPhone == "") return this.loi("SĐT bị rỗng ", "Hãy nhập lại")
        if (this.state.ShippingPhone.length > 10) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        if (this.state.ShippingPhone.length < 0) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        if (Number.isInteger(Number(this.state.ShippingPhone)) == false) return this.loi("SĐT bị sai ", "Hãy nhập lại")
        // if (this.state.Pay == "") return this.loi("Trạng thái bị rỗng ", "Hãy nhập lại")
        if (this.state.OrderStatus == "") return this.loi("Dữ liệu trạng thái bị sai", "Hãy nhập lại")
        if (this.state.OrderStatus == null) return this.loi("Dữ liệu trạng thái bị sai", "Hãy nhập lại")

        const token = this.getToken();
        fetch(variable.API_URL + "Inovices/UpdateInovice/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                shippingphone: this.state.ShippingPhone,
                shippingadress: this.state.ShippingAddress,
                // pay: this.state.Pay == "Đã thanh toán" ? true : false,
                orderStatus: this.state.OrderStatus == "Chưa xác nhận" ? 1 : this.state.OrderStatus == "Đang chuẩn bị" ? 2 : this.state.OrderStatus == "Đang giao" ? 3 : this.state.OrderStatus == "Đã hủy" ? 4 : this.state.OrderStatus == "Hoàn tất" ? 5 : this.state.OrderStatus == "Đã giao" ? 6 : null,

            })
        }).then(res => res.json())
            .then(result => {
                if (result == "Thành công") {
                    console.log(this.state.Trangthai)
                    message.success("Thành công")
                    this.state.Trangthai == "HUY" ? this.CheckHuy()
                        : this.state.Trangthai == "HT" ? this.CheckHT()
                            : this.state.Trangthai == "CXN" ? this.CheckCXN()
                                : this.state.Trangthai == "CB" ? this.CheckCB() :
                                    this.state.Trangthai == "DG" ? this.CheckDG()
                                        : this.state.Trangthai == "DangG" ? this.CheckDangG() :
                                            this.refreshList()
                    this.setState({ open1: false, APdungCheck: this.state.APdungCheck == false ? false : true })
                    this.setState({ open: false })
                    document.getElementById("closeModal").click()
                }
                else
                    message.error(result)
            }, (error) => {
                message.error("Failed")
            }
            )

    }
    DetailsClick(dep) {
        const token = this.getToken();
        this.setState({
            Giamgia: dep
        })
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
            checkTrangthai: dep.orderStatus == 1 ? "Chưa xác nhận" : dep.orderStatus == 2 ? "Đang chuẩn bị" : dep.orderStatus == 3 ? "Đang giao" : dep.orderStatus == 4 ? "Đã hủy" : dep.orderStatus == 5 ? "Hoàn tất" : dep.orderStatus == 6 ? "Đã giao" : null
            ,
            modelTitle: "Chỉnh sửa hóa đơn",
            ShippingPhone: dep.shippingPhone,
            // Pay:
            //     dep.pay == true ?
            //         "Đã thanh toán" : "Chưa thanh toán"
            // ,
            ID: dep.id,
            ShippingAddress: dep.shippingAddress,
            OrderStatus:
                dep.orderStatus == 1 ? "Chưa xác nhận" : dep.orderStatus == 2 ? "Đang chuẩn bị" : dep.orderStatus == 3 ? "Đang giao" : dep.orderStatus == 4 ? "Đã hủy" : dep.orderStatus == 5 ? "Hoàn tất" : dep.orderStatus == 6 ? "Đã giao" : null

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
            ChangeId: value.target.value, currentPage: 1
        });
        console.log(this.state.ChangeId)
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

        if (this.state.startDate == "") return message.warning("Dữ liệu bị trống")
        if (this.state.endDate == "") return message.warning("Dữ liệu bị trống")
        document.getElementById("All1").checked = false;
        document.getElementById("All2").checked = false;
        document.getElementById("All3").checked = false;
        document.getElementById("All4").checked = false;
        document.getElementById("All5").checked = false;
        fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ APdungCheck: true, Invoice: data, currentPage: 1 });
            })
    }
    ChangeShippingPhone(e) {
        this.setState({
            ShippingPhone: e.target.value
        });

    }
    ChangeShippingAddress(e) {
        this.setState({
            ShippingAddress: e.target.value
        });
    }
    CompareDate(day1, day2) {
        const abc = new Date(day1)
        var day1 = abc.getDate() + "/";;
        var month1 = abc.getMonth() + 1 + "/";;
        var year1 = abc.getFullYear()
        let format4 = day1 + month1 + year1;
        console.log(format4)
        const abc1 = new Date(day2)
        var day12 = abc1.getDate() + "/";;
        var month12 = abc1.getMonth() + 1 + "/";;
        var year12 = abc1.getFullYear()
        let format42 = day12 + month12 + year12;
        console.log(format42)
        if (format4 === format42) return true
        else return false;

    }
    DatetimeFormat(e) {
        const abc = new Date(e)
        var day = abc.getDate() + "/";
        var month = abc.getMonth() + 1 + "/";
        var year = abc.getFullYear()
        let format4 = day + month + year;
        return format4;
    }
    DeleteClick(dep) {
        this.setState({ open: true, data: dep })
    }
    Upade(dep) {
        this.setState({ open1: true, data: dep })
    }
    Delete() {
        const token = this.getToken();
        fetch(variable.API_URL + "Inovices/DeleteInvoice/" + this.state.data, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Thành công")
                    this.setState({ open: false })
                    this.refreshList()

                }
                else
                    message.error(result)

            })
    }
    CheckAll() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ APdungCheck: true, Invoice: data });
                })
        }


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
                this.setState({ Invoice: data, Trangthai: null, currentPage: 1, ChangeId: "" });
            })
    }
    CheckHuy() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            APdungCheck: true, Invoice: data.filter((item) => {
                                return item.orderStatus == 4
                            }), Trangthai: "HUY", currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HT" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage, ChangeId: ""
                        });
                    })
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            APdungCheck: true, Invoice: data.filter((item) => {
                                return item.orderStatus == 4
                            }), Trangthai: "HUY", currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HT" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : this.state.currentPage, ChangeId: ""
                        });
                    })
            }
        }
        if (this.state.checkTrangthai != this.state.OrderStatus) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 4
                        }),
                        currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HT" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        Trangthai: "HUY",
                        ChangeId: ""
                    });
                })

        }
        else {
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 4
                        }),
                        currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HT" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : this.state.currentPage,
                        Trangthai: "HUY",
                        ChangeId: ""
                    });
                })


        }


    }
    CheckHT() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 5
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage,
                            ChangeId: "", Trangthai: "HT",
                        })
                    });
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 5
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : this.state.currentPage,
                            ChangeId: "", Trangthai: "HT",
                        });
                    })
            }
        }
        if (this.state.checkTrangthai != this.state.OrderStatus) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 5
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        ChangeId: "", Trangthai: "HT",
                    });
                })

        }
        else {
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 5
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "CXN" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : this.state.currentPage,
                        ChangeId: "", Trangthai: "HT",
                    });
                })

        }

    }
    CheckCXN() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 1
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage,
                            ChangeId: "", Trangthai: "CXN",
                        })
                    });
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 1
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : this.state.currentPage,
                            ChangeId: "", Trangthai: "CXN",
                        });
                    })
            }
        }
        if (this.state.checkTrangthai != this.state.OrderStatus) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);

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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 1
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        ChangeId: "", Trangthai: "CXN",
                    });
                })
        }
        else {
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 1
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CB" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : this.state.currentPage,
                        ChangeId: "", Trangthai: "CXN",
                    });
                })
        }
    }
    CheckCB() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 2
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage,
                            ChangeId: "", Trangthai: "CB",
                        })
                    });
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 2
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "DG" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : this.state.currentPage,
                            ChangeId: "", Trangthai: "CB",
                        });
                    })
            }
        }
        if (this.state.checkTrangthai != this.state.OrderStatus) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 2
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        ChangeId: "", Trangthai: "CB",
                    });
                })
        }
        else {
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 2
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "DG" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : this.state.currentPage,
                        ChangeId: "", Trangthai: "CB",
                    });
                })
        }
    }
    CheckDG() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 3
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "CB" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage,
                            ChangeId: "", Trangthai: "DG",
                        })
                    });
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 3
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "CB" ? 1 :
                                            this.state.Trangthai == "DangG" ? 1
                                                : this.state.currentPage,
                            ChangeId: "", Trangthai: "DG",
                        });
                    })
            }
        }
        if (this.state.checkTrangthai != this.state.OrderStatus) {
            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 3
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        ChangeId: "", Trangthai: "DG",
                    });
                })

        }
        else {
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 3
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DangG" ? 1
                                            : this.state.currentPage,
                        ChangeId: "", Trangthai: "DG",
                    });
                })
        }
    }
    CheckDangG() {
        const token = this.getToken();
        if (this.state.APdungCheck == true) {
            if (this.state.checkTrangthai != this.state.OrderStatus) {
                const recordsPerPage = 5;
                const lastIndex = this.state.currentPage * recordsPerPage;
                const firstIndex = lastIndex - recordsPerPage;
                const b = this.state.Invoice.slice(firstIndex, lastIndex);
                const token = this.getToken();
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 6
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "CB" ? 1 :
                                            this.state.Trangthai == "DG" ? 1
                                                : b.length == 1 ?
                                                    this.state.currentPage - 1 : this.state.currentPage,
                            ChangeId: "", Trangthai: "DangG",
                        })
                    });
            }
            else {
                fetch(variable.API_URL + "Inovices/GetAllInoviceFilterByDate/" + this.state.startDate + "," + this.state.endDate, {
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
                            Invoice: data.filter((item) => {
                                return item.orderStatus == 6
                            }), currentPage: this.state.Trangthai == null ?
                                1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                    this.state.Trangthai == "CXN" ? 1 :
                                        this.state.Trangthai == "CB" ? 1 :
                                            this.state.Trangthai == "DG" ? 1
                                                : this.state.currentPage,
                            ChangeId: "", Trangthai: "DangG",
                        });
                    })
            }
        }

        if (this.state.checkTrangthai != this.state.OrderStatus) {

            const recordsPerPage = 5;
            const lastIndex = this.state.currentPage * recordsPerPage;
            const firstIndex = lastIndex - recordsPerPage;
            const b = this.state.Invoice.slice(firstIndex, lastIndex);
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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 6
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1
                                            : b.length == 1 ?
                                                this.state.currentPage - 1 : this.state.currentPage,
                        ChangeId: "", Trangthai: "DangG",
                    });
                })
        }
        else {

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
                    this.setState({
                        Invoice: data.filter((item) => {
                            return item.orderStatus == 6
                        }), currentPage: this.state.Trangthai == null ?
                            1 : this.state.Trangthai == "HUY" ? 1 : this.state.Trangthai == "HT" ? 1 :
                                this.state.Trangthai == "CXN" ? 1 :
                                    this.state.Trangthai == "CB" ? 1 :
                                        this.state.Trangthai == "DG" ? 1
                                            : this.state.currentPage,
                        ChangeId: "", Trangthai: "DangG",
                    });
                })
        }
        console.log(this.state.currentPage)
    }
    render() {

        const {
            Invoice, data,
            modelTitle,
            Code,
            id,
            AccountId,
            currentPage,
            IssuedDate,
            ShippingAddress,
            ShippingPhone,
            Total, open,
            Status, value, ChangeId,
            Pay, value1, phiship, Giamgia,
            OrderStatus, open1,
            DetailsInvoice,
            totalDetailInvoice
        } = this.state;
        const recordsPerPage = 5;
        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const a = Invoice.slice(firstIndex, lastIndex);
        const npage = Math.ceil(Invoice.length / recordsPerPage)
        const numbers = Array.from({ length: npage }, (_, i) => i + 1);
        const options = ['Đã thanh toán', 'Chưa thanh toán']
        const options2 = ['Hoàn tất',
            'Đang giao', 'Chưa xác nhận', 'Đang chuẩn bị',]
        {/* //1 chưa xác nhận //2 la chua đang chuẩn bị //3 đang giao//6 đã giao//4 đã hủy,//5hoàn tất */ }
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
                            this.UpdateClick()
                        }}>Chấp nhận</Button>
                        <Button onClick={() => {
                            this.setState({ open1: false })
                        }}>Quay lại</Button>
                    </DialogActions>
                </Dialog>
                <div style={{ display: "flex" }}>

                    <div className="card" style={{ marginLeft: 0, marginRight: 0, width: "700px" }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tìm kiếm theo Id Hóa đơn:</label>
                                <div><input className="form-control w-100" value={ChangeId} onChange={(e) => this.ChangeId(e)} type="text" placeholder="Id" />
                                </div>
                                <button type='button' className='btn btn-primary m-2 float-end'
                                    onClick={() => this.refreshList1()}>
                                    Reset Trang
                                </button>
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
                    <div className="card" style={{ width: "217px" }}>
                        <div className="card-body">

                            <label>Trạng thái:</label>
                            <div className>

                                <input type="radio" id="All2" name="fav_language" value="True" onClick={() => this.CheckCXN()} />
                                <label for="True">Chưa xác nhận</label><br />
                                <input type="radio" id="All4" name="fav_language" value="False" onClick={() => this.CheckCB()} />
                                <label for="False">Đang chuẩn bị</label><br />
                                <input type="radio" id="All5" name="fav_language" value="False" onClick={() => this.CheckDG()} />
                                <label for="False">Đang giao</label><br />
                                <input type="radio" id="All3" name="fav_language" value="False" onClick={() => this.CheckHT()} />
                                <label for="False">Hoàn tất</label><br />
                                <input type="radio" id="All1" name="fav_language" value="All" onClick={() => this.CheckHuy()} />
                                <label for="All">Đã hủy</label><br />
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={() => {
                        this.setState({ open: false })
                    }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Bạn có chắc chắc muốn hủy đơn hàng"}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.Delete()
                        }}>Chấp nhận</Button>
                        <Button onClick={() => {
                            this.setState({ open: false })
                        }}>Quay lại</Button>
                    </DialogActions>
                </Dialog>
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
                                        Id Tài khoản
                                    </th>
                                    <th>
                                        Tên người nhận
                                    </th>
                                    <th>
                                        Ngày lập
                                    </th>
                                    <th>
                                        Địa chỉ giao hàng
                                    </th>
                                    <th>
                                        SĐT
                                    </th>
                                    <th>
                                        Tổng
                                    </th>
                                    {/* <th>
                                        Status
                                    </th> */}
                                    <th>
                                        Thanh toán
                                    </th>
                                    <th>
                                        Phương thức Thanh toán
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Hủy
                                    </th>
                                    <th>
                                        Sửa
                                    </th>
                                    <th>
                                        Xem
                                    </th>
                                    <th>
                                        Xuất file PDF
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {Invoice.filter((item) => {
                                    return this.state.ChangeId === ""
                                        ? item : item.id.toString().includes(this.state.ChangeId)
                                }).slice(firstIndex, lastIndex)
                                    .map(dep =>
                                        <tr>
                                            <td>
                                                {dep.id}
                                            </td>
                                            <td>
                                                {dep.accountId}
                                            </td>
                                            <td>
                                                {dep.nameCustomer}
                                            </td>
                                            <td>
                                                {
                                                    this.DatetimeFormat(dep.issuedDate)
                                                }
                                            </td>
                                            <td>
                                                {dep.shippingAddress}
                                            </td>
                                            <td>
                                                {dep.shippingPhone}
                                            </td>
                                            <td>
                                                <CountUp delay={0.4} end={dep.total} duration={0.6} />
                                            </td>
                                            {/* <td>
                                                {dep.status == true ?
                                                    "True" : "False"
                                                }
                                            </td> */}
                                            <td>
                                                {dep.pay == true ?
                                                    "Đã thanh toán" : "Chưa thanh toán"
                                                }
                                            </td>
                                            <td>
                                                {dep.paymentMethods == true ?
                                                    "COD" : "Nhận hàng tại của hàng"
                                                }
                                            </td>
                                            <td>
                                                {
                                                    dep.orderStatus == 1 ? "Chưa xác nhận" : dep.orderStatus == 2 ? "Đang chuẩn bị" : dep.orderStatus == 3 ? "Đang giao" : dep.orderStatus == 4 ? "Đã hủy" : dep.orderStatus == 5 ? "Hoàn tất" : dep.orderStatus == 6 ? "Đã giao" : null
                                                }
                                            </td>
                                            {/* //1 chưa xác nhận //2 la chua đang chuẩn bị //3 đang giao//6 đã giao//4 đã hủy,//5hoàn tất */}
                                            <td>
                                                {dep.orderStatus == 5 ?
                                                    null
                                                    : dep.orderStatus == 4 ? null : <button type='button' className='btn btn-light mr-1' onClick={() => this.DeleteClick(dep.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>
                                                    </button>}
                                            </td>
                                            <td>
                                                {

                                                    dep.orderStatus == 4 || dep.orderStatus == 5 ? null : <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModal'
                                                        onClick={() => this.EditClick(dep)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                        </svg>
                                                    </button>
                                                }

                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#exampleModalCenter'
                                                    onClick={() => this.DetailsClick(dep)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /> <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /> </svg>
                                                </button>
                                            </td>
                                            <td>

                                                <button type='button' className='btn btn-light mr-1'
                                                    onClick={() => this.ReportPDF(dep)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                        <IconReport />
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
                                        <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết hóa đơn</h5>
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                                        </button>


                                    </div>
                                    <div class="modal-body">
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
                                                        Số lượng
                                                    </th>
                                                    <th>
                                                        Giá
                                                    </th>
                                                    <th>
                                                        Tổng tiền
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {DetailsInvoice.map(dep =>

                                                    <tr >
                                                        <td>
                                                            {(dep.productSize.product).name}
                                                        </td>
                                                        <td>
                                                            {((dep.productSize).name)}
                                                        </td>
                                                        <td>
                                                            {dep.quantity}
                                                        </td>
                                                        <td>
                                                            {VND.format(dep.unitPrice)}
                                                        </td>
                                                        <td>
                                                            {VND.format(dep.unitPrice * dep.quantity)}
                                                        </td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <tr>
                                        <h6 style={{ float: 'right' }}>Phí giao hàng: {" "}  {VND.format(this.state.Giamgia.paymentMethods == true ? 35000 : 0)}</h6>
                                    </tr>
                                    <tr>
                                        <h6 style={{ float: 'right' }}>Giảm giá: {" "}{this.state.Giamgia.voucherId == null ? 0 : this.state.Giamgia.voucher.disscount}%</h6>
                                    </tr>

                                    <div >
                                        <h4 style={{ float: 'right' }}>Tổng hóa đơn: {" "}{VND.format(this.state.Giamgia.total)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                Địa chỉ giao hàng
                                            </span>
                                            <input type='text' className='form-control' value={this.state.ShippingAddress}
                                                onChange={(e) => this.ChangeShippingAddress(e)} />
                                            <span className='input-group-text'>
                                                SĐT giao hàng
                                            </span>
                                            <input type='text' className='form-control' value={this.state.ShippingPhone}
                                                onChange={(e) => this.ChangeShippingPhone(e)} />
                                        </div>
                                        {/* <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Thanh toán
                                            </span>
                                            <Autocomplete
                                                disableClearable
                                                value={Pay}
                                                onChange={(event, newValue) => {
                                                    this.setState({
                                                        Pay: newValue
                                                    });
                                                }}

                                                options={options}
                                                style={{ width: 300 }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        // label="Pay"
                                                        variant="outlined" />}
                                            />

                                        </div> */}

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'>
                                                Trạng thái đơn hàng
                                            </span>
                                            <Autocomplete
                                                value={OrderStatus}
                                                disableClearable
                                                onChange={(event, newValue) => {
                                                    this.setState({
                                                        OrderStatus: newValue
                                                    });
                                                }}
                                                options={options2}
                                                style={{ width: 300 }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        // label="Pay"
                                                        variant="outlined" />}
                                            />
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        {
                                            this.state.OrderStatus == "Hoàn tất" ?
                                                <button type='button' className='btn btn-primary float-start' onClick={() => this.Upade(this.state.ID)}>Cập nhật</button>
                                                : <button type='button' className='btn btn-primary float-start' onClick={() => this.UpdateClick1(this.state.ID)}>Cập nhật</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <nav>
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
                        </nav> */}
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



export default InvoiceCRUD;
