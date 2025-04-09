import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierUsersListComponent } from './supplier-users-list.component';

describe('SupplierUsersListComponent', () => {
  let component: SupplierUsersListComponent;
  let fixture: ComponentFixture<SupplierUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
