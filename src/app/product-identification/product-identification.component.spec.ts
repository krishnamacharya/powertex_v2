import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIdentificationComponent } from './product-identification.component';

describe('ProductIdentificationComponent', () => {
  let component: ProductIdentificationComponent;
  let fixture: ComponentFixture<ProductIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
