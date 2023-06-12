import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/ProductTypeList.js')))
const ProductTypepage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const InvoicePage = Loadable(lazy(() => import('../views/sample-page/InvoicePage')))
const ReviewPage = Loadable(lazy(() => import('../views/sample-page/ReviewPage')))
const AdvertisingPanel = Loadable(lazy(() => import('../views/sample-page/AdvertisingPanel')))
const Disscount = Loadable(lazy(() => import('../views/sample-page/Disscount')))


const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/ProductTypepage', exact: true, element: < ProductTypepage /> },
      { path: '/InvoicePage', exact: true, element: < InvoicePage /> },
      { path: '/ReviewPage', exact: true, element: < ReviewPage /> },
      { path: '/AdvertisingPanel', exact: true, element: < AdvertisingPanel /> },
      { path: '/Disscount', exact: true, element: < Disscount /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
