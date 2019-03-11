import { Client } from '../models/client.interface';
import { FormState } from '../../types/form-status.enum';

export interface ClientFormInterface {
  client: Client;
  state: FormState;
}
