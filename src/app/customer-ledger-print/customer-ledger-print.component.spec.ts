import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerPrintComponent } from './customer-ledger-print.component';

describe('CustomerLedgerPrintComponent', () => {
  let component: CustomerLedgerPrintComponent;
  let fixture: ComponentFixture<CustomerLedgerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
