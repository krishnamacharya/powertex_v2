import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersOutstandingComponent } from './dealers-outstanding.component';

describe('DealersOutstandingComponent', () => {
  let component: DealersOutstandingComponent;
  let fixture: ComponentFixture<DealersOutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersOutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
