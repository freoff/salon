import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LientListContainerComponent } from './lient-list-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LientListContainerComponent', () => {
  let component: LientListContainerComponent;
  let fixture: ComponentFixture<LientListContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LientListContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LientListContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
