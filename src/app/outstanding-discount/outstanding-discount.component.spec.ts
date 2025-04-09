import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingDiscountComponent } from './outstanding-discount.component';

describe('OutstandingDiscountComponent', () => {
  let component: OutstandingDiscountComponent;
  let fixture: ComponentFixture<OutstandingDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
