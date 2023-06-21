import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
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
    navlabel: true,
    subheader: 'Hóa đơn',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn',
    icon: IconAperture,
    href: '/InvoicePage',
  },
  {
    id: uniqueId(),
    title: 'Bình luận',
    icon: IconAperture,
    href: '/ReviewPage',
    aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Panner Quảng cáo',
    icon: IconAperture,
    href: '/AdvertisingPanel', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Giảm giá',
    icon: IconAperture,
    href: '/Disscount', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Quản lý tài khoản khách hàng',
    icon: IconAperture,
    href: '/Disscount', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Quản lý Voucher',
    icon: IconAperture,
    href: '/Disscount', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo ngày',
    icon: IconAperture,
    href: '/ReportWeekPage',
    bbb:true
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo tháng',
    icon: IconAperture,
    href: '/ReportWeekPage',
    bbb: true
  },
  {
    id: uniqueId(),
    title: 'Báo cáo theo năm',
    icon: IconAperture,
    href: '/ReportWeekPage',
    bbb: true
  },
  
];

export default Menuitems;
