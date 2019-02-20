import { namedRoute } from './named.route';

export const navigationMenuItems: NavigationMenuItem = {
  clients: [
    {
      label: 'nav.list',
      icon: 'search',
      navigation: namedRoute.clients.list,
    },

    {
      label: 'nav.add',
      icon: 'add',
      navigation: namedRoute.clients.add,
    },
  ],
};

export interface NavigationMenuItem {
  clients: Array<NavigationItem>;
}

export interface NavigationItem {
  label: string;
  icon: string;
  navigation: any[];
}
