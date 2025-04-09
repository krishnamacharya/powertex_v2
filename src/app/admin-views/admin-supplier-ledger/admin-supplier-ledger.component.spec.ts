import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplierLedgerComponent } from './admin-supplier-ledger.component';

describe('AdminSupplierLedgerComponent', () => {
  let component: AdminSupplierLedgerComponent;
  let fixture: ComponentFixture<AdminSupplierLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSupplierLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplierLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
