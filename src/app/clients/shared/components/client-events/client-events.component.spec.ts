import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventsComponent } from './client-events.component';

describe('ClientEventsComponent', () => {
  let component: ClientEventsComponent;
  let fixture: ComponentFixture<ClientEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
