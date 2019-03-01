import { EventItem } from './event-items.enum';

export interface ClietnEventFormInterface {
  data: string;
  eventItems: Array<EventItem>;
}
