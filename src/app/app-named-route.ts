const clientsRoute = ['/', 'secure', 'clients'];
const errorsRoute = ['/', 'errors'];
export const APP_ROUTES = {
  clients: {
    list: [...clientsRoute, 'list'],
    add: [...clientsRoute, 'edit'],
    details: (clientId) => [...clientsRoute, clientId],
    edit: (clientId) => [...clientsRoute, clientId, 'edit'],
  },
  errors: {
    clientNotFound: [...errorsRoute, 'client-not-found'],
  },
};
