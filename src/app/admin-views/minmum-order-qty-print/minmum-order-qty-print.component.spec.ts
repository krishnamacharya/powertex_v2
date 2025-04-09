import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinmumOrderQtyPrintComponent } from './minmum-order-qty-print.component';

describe('MinmumOrderQtyPrintComponent', () => {
  let component: MinmumOrderQtyPrintComponent;
  let fixture: ComponentFixture<MinmumOrderQtyPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinmumOrderQtyPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinmumOrderQtyPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
