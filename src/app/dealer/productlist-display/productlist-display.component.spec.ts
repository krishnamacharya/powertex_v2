import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistDisplayComponent } from './productlist-display.component';

describe('ProductlistDisplayComponent', () => {
  let component: ProductlistDisplayComponent;
  let fixture: ComponentFixture<ProductlistDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
