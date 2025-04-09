import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingPositiondetailComponent } from './outstanding-positiondetail.component';

describe('OutstandingPositiondetailComponent', () => {
  let component: OutstandingPositiondetailComponent;
  let fixture: ComponentFixture<OutstandingPositiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingPositiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingPositiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
