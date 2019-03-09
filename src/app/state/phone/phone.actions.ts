import { Action } from '@ngrx/store';

export enum PhonesActionsTypes {
  CallToNumber = '[Phone] Call to numer',
}

export class CallToNumber implements Action {
  readonly type = PhonesActionsTypes.CallToNumber;
  constructor(public payload: { number: string }) {}
}

export type PhoneActions = CallToNumber;
