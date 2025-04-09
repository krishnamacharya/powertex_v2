import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingPackingListComponent } from './admin-pending-packing-list.component';

describe('AdminPendingPackingListComponent', () => {
  let component: AdminPendingPackingListComponent;
  let fixture: ComponentFixture<AdminPendingPackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingPackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
