import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInvoicesSupplierPrintComponent } from './supplier-invoices-supplier-print.component';

describe('SupplierInvoicesSupplierPrintComponent', () => {
  let component: SupplierInvoicesSupplierPrintComponent;
  let fixture: ComponentFixture<SupplierInvoicesSupplierPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierInvoicesSupplierPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInvoicesSupplierPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
