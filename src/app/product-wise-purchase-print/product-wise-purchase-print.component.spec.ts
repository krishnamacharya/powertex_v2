import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWisePurchasePrintComponent } from './product-wise-purchase-print.component';

describe('ProductWisePurchasePrintComponent', () => {
  let component: ProductWisePurchasePrintComponent;
  let fixture: ComponentFixture<ProductWisePurchasePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWisePurchasePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWisePurchasePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
