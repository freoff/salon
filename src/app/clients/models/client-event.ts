import * as Money from 'moneyjs';

export interface ClientEvent {
  _id: string;
  eventDate: string;
  price: Money;
  eventNotes: string;
}
