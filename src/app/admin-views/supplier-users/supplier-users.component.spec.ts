import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierUsersComponent } from './supplier-users.component';

describe('SupplierUsersComponent', () => {
  let component: SupplierUsersComponent;
  let fixture: ComponentFixture<SupplierUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
