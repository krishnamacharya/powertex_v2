import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingInvoiceListComponent } from './admin-pending-invoice-list.component';

describe('AdminPendingInvoiceListComponent', () => {
  let component: AdminPendingInvoiceListComponent;
  let fixture: ComponentFixture<AdminPendingInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
