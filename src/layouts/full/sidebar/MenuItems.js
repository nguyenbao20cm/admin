import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,
  IconUser, IconSettings, IconReport,IconFileInvoice,IconMessage,IconAd2,IconDiscount,IconTicket,IconHistory
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Trang chủ',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },



  {
    id: uniqueId(),
    title: 'Loại sản phẩm', bbb: false,
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Sản phẩm', bbb: false,
    icon: IconAperture,
    href: '/ProductTypepage',
  },
  {
    id: uniqueId(),
    title: 'Size sản phẩm',
    icon: IconAperture, bbb: false,
    href: '/ProductSize',
  },
  {
    id: uniqueId(),
    title: 'Nhà cung cấp',
    icon: IconAperture, bbb: false,
    href: '/NhaCungCapSanPham',
  },
  {
    navlabel: true,
    subheader: 'Hóa đơn',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn',
    icon: IconFileInvoice,
    href: '/InvoicePage',
  },
  {
    id: uniqueId(),
    title: 'Bình luận',
    icon: IconMessage,
    href: '/ReviewPage',
    aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Panner Quảng cáo',
    icon: IconAd2,
    href: '/AdvertisingPanel', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Giảm giá',
    icon: IconDiscount,
    href: '/Disscount', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Tài khoản khách hàng',
    icon: IconAperture,
    href: '/Account', taikhoan: true,
  },
  { 
    id: uniqueId(),
    title: 'Quản lý Voucher',
    icon: IconTicket,
    href: '/Voucher', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Lịch sử người dùng',
    icon: IconHistory,
    href: '/LichSuThaoTac', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Cài đặt',
    icon: IconSettings,
    href: '/TaiKhoan', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Tài khoản nhân viên',
    icon: IconAperture,
    href: '/TaiKhoanNhanVien', taikhoan: true,
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo ngày',
    icon: IconReport,
    href: '/ReportDay',
    bbb:true
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo tháng',
    icon: IconReport,
    href: '/ReportWeek',
    bbb: true
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo năm',
    icon: IconReport,
    href: '/ReportYear',
    bbb: true
  },
  
];

export default Menuitems;
