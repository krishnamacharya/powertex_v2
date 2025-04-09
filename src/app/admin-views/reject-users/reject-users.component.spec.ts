import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectUsersComponent } from './reject-users.component';

describe('RejectUsersComponent', () => {
  let component: RejectUsersComponent;
  let fixture: ComponentFixture<RejectUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
