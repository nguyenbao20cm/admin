import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,
  IconUser, IconSettings, IconReport, IconFileInvoice, IconMessage, IconAd2, IconDiscount, IconTicket, IconHistory,
  IconBuildingWarehouse
} from '@tabler/icons';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Kho hàng',
  },
  {
    id: uniqueId(),
    title: 'Kho hàng',
    icon: IconBuildingWarehouse,
    href: '/KhoHang',
  },
  {
    navlabel: true,
    subheader: 'Sản phẩm',
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
    navlabel: true,
    subheader: 'Hóa đơn',
  },
  {
    id: uniqueId(),
    title: 'Hóa đơn nhập ',
    icon: IconAperture, ccc: false,
    href: '/HoaDonNhap',
  },


  {
    id: uniqueId(),
    title: 'Nhà cung cấp',
    icon: IconAperture, ccc: false,
    href: '/NhaCungCapSanPham',
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
  // {
  //   id: uniqueId(),
  //   title: 'Giảm giá',
  //   icon: IconDiscount,
  //   href: '/Disscount', aaa: true,
  // },

  {
    id: uniqueId(),
    title: 'Lịch sử người dùng',
    icon: IconHistory,
    href: '/LichSuThaoTac', aaa: true,
  },

];

export default Menuitems;
