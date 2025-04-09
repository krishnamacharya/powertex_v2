import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDealerpoFromOneUserComponent } from './all-dealerpo-from-one-user.component';

describe('AllDealerpoFromOneUserComponent', () => {
  let component: AllDealerpoFromOneUserComponent;
  let fixture: ComponentFixture<AllDealerpoFromOneUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDealerpoFromOneUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDealerpoFromOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
