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
    navlabel: true,
    subheader: 'Table',
  },

  {
    id: uniqueId(),
    title: 'ProductType Page',
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Product Page',
    icon: IconAperture,
    href: '/ProductTypepage',
  },
  {
    id: uniqueId(),
    title: 'ProductSize Page',
    icon: IconAperture,
    href: '/ProductSize',
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
  },
  {
    id: uniqueId(),
    title: 'AdvertisingPanel Page',
    icon: IconAperture,
    href: '/AdvertisingPanel',
  },
  {
    id: uniqueId(),
    title: 'Disscount Page',
    icon: IconAperture,
    href: '/Disscount',
  },

  
];

export default Menuitems;
