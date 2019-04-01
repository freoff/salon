import { Phone } from './phone.interface';

export interface Client {
  id: string;
  fname: string;
  lname: string;
  phones: Phone[];
  email: string;
  sex: 'male' | 'female';
  clientNotes: string;
}
