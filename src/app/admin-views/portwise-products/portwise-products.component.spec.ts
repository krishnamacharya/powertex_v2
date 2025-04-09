import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortwiseProductsComponent } from './portwise-products.component';

describe('PortwiseProductsComponent', () => {
  let component: PortwiseProductsComponent;
  let fixture: ComponentFixture<PortwiseProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortwiseProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortwiseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
