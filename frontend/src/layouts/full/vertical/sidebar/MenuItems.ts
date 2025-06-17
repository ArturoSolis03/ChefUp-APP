import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Home',
    icon: 'layers-minimalistic-line-duotone',
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Recipes',
    icon: 'book-broken',
    href: '/recipes',
  },
  {
    id: uniqueId(),
    title: 'Favorites',
    icon: 'heart-line-duotone',
    href: '/favorites',
  },
  {
    id: uniqueId(),
    title: 'Logout',
    icon: 'logout-2-line-duotone',
    href: '/auth/logout',
  },
];

export default Menuitems;
