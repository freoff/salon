import * as Money from 'moneyjs';

export interface ClientEvent {
  eventDate: string;
  price: Money;
  eventNotes: string;
}
