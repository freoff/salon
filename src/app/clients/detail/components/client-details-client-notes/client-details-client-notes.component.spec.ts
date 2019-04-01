import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsClientNotesComponent } from './client-details-client-notes.component';

describe('ClientDetailsClientNotesComponent', () => {
  let component: ClientDetailsClientNotesComponent;
  let fixture: ComponentFixture<ClientDetailsClientNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailsClientNotesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsClientNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
