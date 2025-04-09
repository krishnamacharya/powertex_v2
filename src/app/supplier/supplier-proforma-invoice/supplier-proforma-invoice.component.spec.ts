import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProformaInvoiceComponent } from './supplier-proforma-invoice.component';

describe('SupplierProformaInvoiceComponent', () => {
  let component: SupplierProformaInvoiceComponent;
  let fixture: ComponentFixture<SupplierProformaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProformaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
