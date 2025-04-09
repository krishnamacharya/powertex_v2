import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDealersalesReportsprintComponent } from './market-dealersales-reportsprint.component';

describe('MarketDealersalesReportsprintComponent', () => {
  let component: MarketDealersalesReportsprintComponent;
  let fixture: ComponentFixture<MarketDealersalesReportsprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDealersalesReportsprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDealersalesReportsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
