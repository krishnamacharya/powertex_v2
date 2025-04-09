import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDutyListPrintComponent } from './pending-duty-list-print.component';

describe('PendingDutyListPrintComponent', () => {
  let component: PendingDutyListPrintComponent;
  let fixture: ComponentFixture<PendingDutyListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDutyListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDutyListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
