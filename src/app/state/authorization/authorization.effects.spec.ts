import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthorizationEffects } from './authorization.effects';

describe('AuthorizationEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthorizationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthorizationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
