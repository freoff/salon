import { RxJsonSchema, RxSchema } from 'rxdb';
import { Phone } from '../../../clients/models/telephone.interface';
import { ClientDocMethods, ClientsCollection, ClientCollectionMethods } from './clients.collection';

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
    },
    sex: {
      type: 'string',
    },
    telephones: {
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
            type: 'number'
          },
          primary: {
            type: 'boolean'
          }
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
};
export const clientCollectionMethods: ClientCollectionMethods = {
  totalClients: async function(this: ClientsCollection) {
    const all = await this.find().exec();
    return all.length;
  },
};
