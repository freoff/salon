const clientsRoute = ['/', 'secure', 'clients'];

export const namedRoute = {
    clients: {

        list       : [...clientsRoute, 'list'],
        edit       : [...clientsRoute, 'edit', {formState: 'update'}],
        add        : [...clientsRoute, 'edit'],
        details    : [...clientsRoute, ],
    },
};
