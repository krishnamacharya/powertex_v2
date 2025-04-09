import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReportsSupplierComponent } from './supplier-reports-supplier.component';

describe('SupplierReportsSupplierComponent', () => {
  let component: SupplierReportsSupplierComponent;
  let fixture: ComponentFixture<SupplierReportsSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportsSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportsSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
