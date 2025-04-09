import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaidlistPrintComponent } from './supplier-paidlist-print.component';

describe('SupplierPaidlistPrintComponent', () => {
  let component: SupplierPaidlistPrintComponent;
  let fixture: ComponentFixture<SupplierPaidlistPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPaidlistPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPaidlistPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
