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
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },



  {
    id: uniqueId(),
    title: 'ProductType Page', bbb: false,
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Product Page', bbb: false,
    icon: IconAperture,
    href: '/ProductTypepage',
  },
  {
    id: uniqueId(),
    title: 'ProductSize Page',
    icon: IconAperture, bbb: false,
    href: '/ProductSize',
  },
  {
    navlabel: true,
    subheader: 'Invoice',
  },
  {
    id: uniqueId(),
    title: 'Invoice Page',
    icon: IconAperture,
    href: '/InvoicePage',
  },
  {
    id: uniqueId(),
    title: 'Review Page',
    icon: IconAperture,
    href: '/ReviewPage',
    aaa: true,
  },
  {
    id: uniqueId(),
    title: 'AdvertisingPanel Page',
    icon: IconAperture,
    href: '/AdvertisingPanel', aaa: true,
  },
  {
    id: uniqueId(),
    title: 'Disscount Page',
    icon: IconAperture,
    href: '/Disscount', aaa: true,
  },

  {
    id: uniqueId(),
    title: 'Report Week Page',
    icon: IconAperture,
    href: '/ReportWeekPage',
    bbb:true
  },

  
];

export default Menuitems;
