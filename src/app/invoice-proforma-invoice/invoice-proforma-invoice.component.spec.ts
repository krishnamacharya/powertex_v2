import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProformaInvoiceComponent } from './invoice-proforma-invoice.component';

describe('InvoiceProformaInvoiceComponent', () => {
  let component: InvoiceProformaInvoiceComponent;
  let fixture: ComponentFixture<InvoiceProformaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceProformaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
