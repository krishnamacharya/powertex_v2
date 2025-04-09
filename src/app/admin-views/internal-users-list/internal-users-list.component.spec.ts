import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalUsersListComponent } from './internal-users-list.component';

describe('InternalUsersListComponent', () => {
  let component: InternalUsersListComponent;
  let fixture: ComponentFixture<InternalUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
