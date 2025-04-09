import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosUsersComponent } from './pos-users.component';

describe('PosUsersComponent', () => {
  let component: PosUsersComponent;
  let fixture: ComponentFixture<PosUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
