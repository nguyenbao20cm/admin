import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full_banhang - Copy/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/ProductTypeList.js')))
const ProductTypepage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const InvoicePage = Loadable(lazy(() => import('../views/sample-page/InvoicePage')))
const ReviewPage = Loadable(lazy(() => import('../views/sample-page/ReviewPage')))
const AdvertisingPanel = Loadable(lazy(() => import('../views/sample-page/AdvertisingPanel')))
const Disscount = Loadable(lazy(() => import('../views/sample-page/Disscount')))
const ProductSize = Loadable(lazy(() => import('../views/sample-page/ProductSize')))
const ReportWeek = Loadable(lazy(() => import('../views/sample-page/ReportWeek')))
const ReportDay = Loadable(lazy(() => import('../views/sample-page/ReportDay')))
const ReportYear = Loadable(lazy(() => import('../views/sample-page/ReportYear')))
const Voucher = Loadable(lazy(() => import('../views/sample-page/Voucher')))
const Account = Loadable(lazy(() => import('../views/sample-page/Account')))
const AccountStaff = Loadable(lazy(() => import('../views/sample-page/AccountStaff')))
const Supplier = Loadable(lazy(() => import('../views/sample-page/Supplier')))
const TaiKhoan = Loadable(lazy(() => import('../views/sample-page/ChangeInfo')))
const History = Loadable(lazy(() => import('../views/sample-page/History')))

const Caidat = Loadable(lazy(() => import('../views/sample-page/Caidat')))

const Brand = Loadable(lazy(() => import('../views/sample-page/Brand')))

const ForgotPassword = Loadable(lazy(() => import('../views/authentication/ForgotPass')))

const HoaDonNhap = Loadable(lazy(() => import('../views/sample-page/ImportInvoice')))
const GiaoDichThanhToan = Loadable(lazy(() => import('../views/sample-page/GiaoDichThanhToan')))
const AnhPhu = Loadable(lazy(() => import('../views/sample-page/AnhPhu')))
const Kho = Loadable(lazy(() => import('../views/sample-page/KhoHang')))












const Reset = Loadable(lazy(() => import('../views/authentication/ResetPassword')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Router = [
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '/', element: <Navigate to="/KhoHang" /> },
           
            { path: '/sample-page', exact: true, element: <SamplePage /> },
            { path: '/ProductTypepage', exact: true, element: < ProductTypepage /> },
            // { path: '/Disscount', exact: true, element: < Disscount /> },
            { path: '/ProductSize', exact: true, element: < ProductSize /> },
            { path: '/Account', exact: true, element: < Account /> },
            { path: '/NhaCungCapSanPham', exact: true, element: < Supplier /> },
            { path: '/TaiKhoan', exact: true, element: < TaiKhoan /> },
            { path: '/LichSuThaoTac', exact: true, element: < History /> },
            { path: '/HoaDonNhap', exact: true, element: < HoaDonNhap /> },
            { path: '/KhoHang', exact: true, element: < Kho /> },
            { path: '*', element: <Navigate to="/auth/404" /> },
            { path: '/AnhPhu', exact: true, element: < AnhPhu /> },
            { path: '/Brand', exact: true, element: < Brand /> },
        ],
    },

    {
        path: '/auth',
        element: <BlankLayout />,
        children: [
            { path: '404', element: <Error /> },
            { path: '/auth/DoiMatKhau', element: <Reset /> },
            { path: '/auth/QuenMatKhau', element: <ForgotPassword /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/DangNhap', element: <Login /> },
            { path: '*', element: <Navigate to="/auth/404" /> },
        ],
    },
];

export default Router;
