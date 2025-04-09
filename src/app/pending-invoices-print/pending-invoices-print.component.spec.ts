import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInvoicesPrintComponent } from './pending-invoices-print.component';

describe('PendingInvoicesPrintComponent', () => {
  let component: PendingInvoicesPrintComponent;
  let fixture: ComponentFixture<PendingInvoicesPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingInvoicesPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInvoicesPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
