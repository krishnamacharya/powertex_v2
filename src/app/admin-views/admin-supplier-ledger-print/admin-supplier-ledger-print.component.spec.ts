import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplierLedgerPrintComponent } from './admin-supplier-ledger-print.component';

describe('AdminSupplierLedgerPrintComponent', () => {
  let component: AdminSupplierLedgerPrintComponent;
  let fixture: ComponentFixture<AdminSupplierLedgerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSupplierLedgerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplierLedgerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
