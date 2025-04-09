import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSupplierPaymentsComponent } from './pending-supplier-payments.component';

describe('PendingSupplierPaymentsComponent', () => {
  let component: PendingSupplierPaymentsComponent;
  let fixture: ComponentFixture<PendingSupplierPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSupplierPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSupplierPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
