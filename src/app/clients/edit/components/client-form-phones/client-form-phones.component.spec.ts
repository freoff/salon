import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormPhonesComponent } from './client-form-phones.component';

describe('ClientFormPhonesComponent', () => {
  let component: ClientFormPhonesComponent;
  let fixture: ComponentFixture<ClientFormPhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFormPhonesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
