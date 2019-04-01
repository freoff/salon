import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSettingsContainerComponent } from './application-settings-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ApplicationSettingsContainerComponent', () => {
  let component: ApplicationSettingsContainerComponent;
  let fixture: ComponentFixture<ApplicationSettingsContainerComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ApplicationSettingsContainerComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSettingsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
