import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosNewUserComponent } from './pos-new-user.component';

describe('PosNewUserComponent', () => {
  let component: PosNewUserComponent;
  let fixture: ComponentFixture<PosNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
