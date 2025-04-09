import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPurchaseOrderComponent } from './supplier-purchase-order.component';

describe('SupplierPurchaseOrderComponent', () => {
  let component: SupplierPurchaseOrderComponent;
  let fixture: ComponentFixture<SupplierPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
