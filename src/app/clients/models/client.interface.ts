import {Telephone} from './telephone.interface';

export interface Client {
    id: string;
    fname: string;
    lname: string;
    tel: Telephone;
    email: string;
    clientNotes: string[];
}
