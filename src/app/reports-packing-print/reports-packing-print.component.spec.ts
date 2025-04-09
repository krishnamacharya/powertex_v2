import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPackingPrintComponent } from './reports-packing-print.component';

describe('ReportsPackingPrintComponent', () => {
  let component: ReportsPackingPrintComponent;
  let fixture: ComponentFixture<ReportsPackingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPackingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPackingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
