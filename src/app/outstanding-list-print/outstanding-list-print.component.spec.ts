import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingListPrintComponent } from './outstanding-list-print.component';

describe('OutstandingListPrintComponent', () => {
  let component: OutstandingListPrintComponent;
  let fixture: ComponentFixture<OutstandingListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
