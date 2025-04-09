import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderSummaryComponent } from './supplier-order-summary.component';

describe('SupplierOrderSummaryComponent', () => {
  let component: SupplierOrderSummaryComponent;
  let fixture: ComponentFixture<SupplierOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
