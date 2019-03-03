import {Phone} from './phone.interface';
import { ClientEvent } from './client-event';

export interface Client {
    id: string;
    fname: string;
    lname: string;
    phones: Phone[];
    email: string;
    sex: 'male' | 'female';
    clientNotes: string;

}
