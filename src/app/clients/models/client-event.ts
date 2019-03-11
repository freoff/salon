import * as Money from 'moneyjs';
import { Client } from './client.interface';

export interface ClientEvent {
  _id: string;
  eventDate: number;
  price: Money;
  eventNotes: string;
  client: string | Client;
}
export interface Money {
  currency: string;
  amount: number;
}
