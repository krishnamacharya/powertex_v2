import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDiscountsComponent } from './offers-discounts.component';

describe('OffersDiscountsComponent', () => {
  let component: OffersDiscountsComponent;
  let fixture: ComponentFixture<OffersDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
