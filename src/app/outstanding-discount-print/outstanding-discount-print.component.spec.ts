import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingDiscountPrintComponent } from './outstanding-discount-print.component';

describe('OutstandingDiscountPrintComponent', () => {
  let component: OutstandingDiscountPrintComponent;
  let fixture: ComponentFixture<OutstandingDiscountPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingDiscountPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingDiscountPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
