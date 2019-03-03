import { RxJsonSchema } from 'rxdb';

export const clientEventSchema: RxJsonSchema = {
  title: 'Client event schema',
  description: 'clients event schema',
  version: 0,
  type: 'object',
  properties: {
    eventDate: {
      type: 'string',
      format: 'date-time',
    },
    price: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
        },
        currency: { type: 'string' },
      },
    },
    eventNotes: {
      type: 'string',
    },
  },
};