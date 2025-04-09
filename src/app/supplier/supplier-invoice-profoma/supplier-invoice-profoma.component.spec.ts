import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInvoiceProfomaComponent } from './supplier-invoice-profoma.component';

describe('SupplierInvoiceProfomaComponent', () => {
  let component: SupplierInvoiceProfomaComponent;
  let fixture: ComponentFixture<SupplierInvoiceProfomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierInvoiceProfomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInvoiceProfomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
