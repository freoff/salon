import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListsComponent } from './clients-lists.component';

describe('ClientsListsComponent', () => {
  let component: ClientsListsComponent;
  let fixture: ComponentFixture<ClientsListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsListsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
