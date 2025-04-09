import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDutyListComponent } from './pending-duty-list.component';

describe('PendingDutyListComponent', () => {
  let component: PendingDutyListComponent;
  let fixture: ComponentFixture<PendingDutyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDutyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDutyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
