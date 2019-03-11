import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClientPageEffects } from './client-page.effects';

describe('ClientPageEffects', () => {
  let actions$: Observable<any>;
  let effects: ClientPageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientPageEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(ClientPageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
