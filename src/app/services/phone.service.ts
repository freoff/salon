import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers';
import { CallToNumber } from '../state/phone/phone.actions';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  constructor(private store: Store<State>) {}

  call({ number }: { number: string }) {
    this.store.dispatch(new CallToNumber({ number }));
  }
}
