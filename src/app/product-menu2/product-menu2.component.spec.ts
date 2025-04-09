import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenu2Component } from './product-menu2.component';

describe('ProductMenu2Component', () => {
  let component: ProductMenu2Component;
  let fixture: ComponentFixture<ProductMenu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMenu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
