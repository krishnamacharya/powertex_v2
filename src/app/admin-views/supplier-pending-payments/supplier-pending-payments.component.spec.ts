import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPendingPaymentsComponent } from './supplier-pending-payments.component';

describe('SupplierPendingPaymentsComponent', () => {
  let component: SupplierPendingPaymentsComponent;
  let fixture: ComponentFixture<SupplierPendingPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPendingPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPendingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
