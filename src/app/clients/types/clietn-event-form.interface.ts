import { EventItem } from './event-items.enum';

export interface ClietnEventFormInterface {
  _id?: string;
  eventDate: string | number;
  price: number;
  eventNotes: string;
}
