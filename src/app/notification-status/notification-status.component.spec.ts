import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationStatusComponent } from './notification-status.component';

describe('NotificationStatusComponent', () => {
  let component: NotificationStatusComponent;
  let fixture: ComponentFixture<NotificationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
