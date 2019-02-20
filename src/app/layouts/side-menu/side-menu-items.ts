import { APP_ROUTES } from '../../app-named-route';

export const navigationMenuItems: NavigationMenuItem = {
  clients: [
    {
      label: 'nav.list',
      icon: 'search',
      navigation: APP_ROUTES.clients.list,
    },

    {
      label: 'nav.add',
      icon: 'add',
      navigation: APP_ROUTES.clients.add,
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
