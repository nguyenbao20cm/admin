import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,
  IconUser, IconSettings, IconReport, IconFileInvoice, IconMessage, IconAd2, IconDiscount, IconTicket, IconHistory, 
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
    title: 'Ảnh phụ sản phẩm', bbb: false,
    icon: IconAperture,
    href: '/AnhPhu',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn nhập ',
    icon: IconAperture, ccc: false,
    href: '/HoaDonNhap',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn GD VNPay ',
    icon: IconAperture, ccc: false,
    href: '/GiaoDich',
  },
  {
    id: uniqueId(),
    title: 'Size sản phẩm',
    icon: IconAperture, bbb: false,
    href: '/ProductSize',
  },
  {
    id: uniqueId(),
    title: 'Thương hiệu sản phẩm',
    icon: IconAperture, bbb: false,
    href: '/Brand',
  },
  {
    id: uniqueId(),
    title: 'Nhà cung cấp',
    icon: IconAperture, ccc: false,
    href: '/NhaCungCapSanPham',
  },
  {
    navlabel: true,
    subheader: 'Hóa đơn',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn bán',
    icon: IconFileInvoice,
    href: '/InvoicePage', ccc: false,
  },
  {
    id: uniqueId(),
    title: 'Tài khoản người dùng',
    icon: IconUser,
    href: '/TaiKhoan', aaa: true,
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
    title: 'Pannel',
    icon: IconAd2,
    href: '/AdvertisingPanel', aaa: true,
  },

  // {
  //   id: uniqueId(),
  //   title: 'Giảm giá',
  //   icon: IconDiscount,
  //   href: '/Disscount', aaa: true,
  // },
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
    href: '/Caidat', aaa: true,
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
    title: 'Sơ đồ báo cáo  ',
    icon: IconReport,
    href: '/ReportWeek',
    bbb: true
  },
  // {
  //   id: uniqueId(),
  //   title: 'Báo cáo theo năm',
  //   icon: IconReport,
  //   href: '/ReportYear',
  //   bbb: true
  // },
  
];

export default Menuitems;
