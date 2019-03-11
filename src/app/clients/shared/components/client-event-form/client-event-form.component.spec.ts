import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventFormComponent } from './client-event-form.component';

describe('ClientEventFormComponent', () => {
  let component: ClientEventFormComponent;
  let fixture: ComponentFixture<ClientEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEventFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
