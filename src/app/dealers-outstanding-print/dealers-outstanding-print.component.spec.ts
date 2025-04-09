import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersOutstandingPrintComponent } from './dealers-outstanding-print.component';

describe('DealersOutstandingPrintComponent', () => {
  let component: DealersOutstandingPrintComponent;
  let fixture: ComponentFixture<DealersOutstandingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersOutstandingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersOutstandingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
