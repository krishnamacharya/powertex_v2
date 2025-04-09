import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinmumOrderQtyComponent } from './minmum-order-qty.component';

describe('MinmumOrderQtyComponent', () => {
  let component: MinmumOrderQtyComponent;
  let fixture: ComponentFixture<MinmumOrderQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinmumOrderQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinmumOrderQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
