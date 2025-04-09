import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProformaInvoiceComponent } from './admin-proforma-invoice.component';

describe('AdminProformaInvoiceComponent', () => {
  let component: AdminProformaInvoiceComponent;
  let fixture: ComponentFixture<AdminProformaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProformaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
