import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAcceptanceComponent } from './stock-acceptance.component';

describe('StockAcceptanceComponent', () => {
  let component: StockAcceptanceComponent;
  let fixture: ComponentFixture<StockAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
