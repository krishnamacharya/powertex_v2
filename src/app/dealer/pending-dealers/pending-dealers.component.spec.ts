import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDealersComponent } from './pending-dealers.component';

describe('PendingDealersComponent', () => {
  let component: PendingDealersComponent;
  let fixture: ComponentFixture<PendingDealersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDealersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
