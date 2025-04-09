import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfileEditComponent } from './supplier-profile-edit.component';

describe('SupplierProfileEditComponent', () => {
  let component: SupplierProfileEditComponent;
  let fixture: ComponentFixture<SupplierProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
