import {Phone} from './telephone.interface';

export interface Client {
    id: string;
    fname: string;
    lname: string;
    tel: Phone;
    email: string;
    clientNotes: string[];
}
