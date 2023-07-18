import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,
  IconUser, IconSettings, IconReport, IconFileInvoice, IconMessage, IconAd2, IconDiscount, IconTicket, IconHistory,
  IconBuildingWarehouse
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [

 
  {
    navlabel: true,
    subheader: 'Hóa đơn',
  },
  
  {
    id: uniqueId(),
    title: 'Hóa đơn GD VNPay ',
    icon: IconAperture, ccc: false,
    href: '/GiaoDich',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn bán',
    icon: IconFileInvoice,
    href: '/InvoicePage', ccc: false,
  },
  {
    navlabel: true,
    subheader: 'Báo cáo',
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo ngày',
    icon: IconReport,
    href: '/ReportDay',
    bbb: true
  },
  {
    id: uniqueId(),
    title: 'Sơ đồ báo cáo  ',
    icon: IconReport,
    href: '/ReportWeek',
    bbb: true
  },
  {
    navlabel: true,
    subheader: 'Các chức năng khác',
  },
  {
    id: uniqueId(),
    title: 'Tài khoản người dùng',
    icon: IconUser,
    href: '/TaiKhoan', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Lịch sử người dùng',
    icon: IconHistory,
    href: '/LichSuThaoTac', aaa: true,
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
    title: 'Banner',
    icon: IconAd2,
    href: '/AdvertisingPanel', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Khách hàng',
    icon: IconAperture,
    href: '/Account', taikhoan: true,
  },
  {
    id: uniqueId(),
    title: 'Quản lý Voucher',
    icon: IconTicket,
    href: '/Voucher', aaa: true,
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
