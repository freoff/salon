const clientsRoute = ['/', 'secure', 'clients'];
const errorsRoute = ['/', 'errors'];
export const APP_ROUTES = {
  clients: {
    list: [...clientsRoute, 'list'],
    edit: [...clientsRoute, 'edit', { formState: 'update' }],
    add: [...clientsRoute, 'edit'],
    details: (clientId) => [...clientsRoute, clientId],
  },
  errors: {
    clientNotFound: [...errorsRoute, 'client-not-found'],
  },
};
