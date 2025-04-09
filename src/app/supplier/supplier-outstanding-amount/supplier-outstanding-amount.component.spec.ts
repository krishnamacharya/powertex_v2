import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOutstandingAmountComponent } from './supplier-outstanding-amount.component';

describe('SupplierOutstandingAmountComponent', () => {
  let component: SupplierOutstandingAmountComponent;
  let fixture: ComponentFixture<SupplierOutstandingAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOutstandingAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOutstandingAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
