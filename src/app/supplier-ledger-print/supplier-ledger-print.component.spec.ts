import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLedgerPrintComponent } from './supplier-ledger-print.component';

describe('SupplierLedgerPrintComponent', () => {
  let component: SupplierLedgerPrintComponent;
  let fixture: ComponentFixture<SupplierLedgerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierLedgerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierLedgerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
