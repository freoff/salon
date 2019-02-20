import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoClientErrorPage } from './no-client-error.page';

describe('NoClientErrorPage', () => {
  let component: NoClientErrorPage;
  let fixture: ComponentFixture<NoClientErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoClientErrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoClientErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
