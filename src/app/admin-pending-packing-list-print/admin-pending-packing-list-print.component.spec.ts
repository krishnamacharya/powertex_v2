import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingPackingListPrintComponent } from './admin-pending-packing-list-print.component';

describe('AdminPendingPackingListPrintComponent', () => {
  let component: AdminPendingPackingListPrintComponent;
  let fixture: ComponentFixture<AdminPendingPackingListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingPackingListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingPackingListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
