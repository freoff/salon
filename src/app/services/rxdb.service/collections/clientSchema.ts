import { RxJsonSchema } from 'rxdb';
import { ClientCollectionMethods, ClientDocMethods, ClientDocument, ClientsCollection } from './clients.collection';

export const clientSchema: RxJsonSchema = {
  title: 'Client schema',
  description: 'clients schema',
  version: 0,
  type: 'object',

  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    fname: {
      type: 'string',
    },
    lname: {
      type: 'string',
      encrypted: true,
    },
    sex: {
      type: 'string',
    },
    phones: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          number: {
            type: 'string',
          },
          order: {
            type: 'number',
          },
          primary: {
            type: 'boolean',
          },
        },
      },
    },
    email: {
      type: 'string',
    },
    clientNotes: {
      type: 'string',
    },
  },
};

export const clientDocMethods: ClientDocMethods = {
  getFullName: function() {
    return `${this.fname} ${this.lname}`;
  },
  getClientData: function(this: ClientDocument) {
    return {
      id: this.get('id'),
      fname: this.get('fname'),
      lname: this.lname,
      clientNotes: this.get('clientNotes'),
      email: this.get('email'),
      sex: this.get('sex'),
      phones: this.get('phones'),
    };
  },
};
export const clientCollectionMethods: ClientCollectionMethods = {
  totalClients: async function(this: ClientsCollection) {
    const all = await this.find().exec();
    return all.length;
  },
};
