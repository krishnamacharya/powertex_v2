import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerOffersComponent } from './dealer-offers.component';

describe('DealerOffersComponent', () => {
  let component: DealerOffersComponent;
  let fixture: ComponentFixture<DealerOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
