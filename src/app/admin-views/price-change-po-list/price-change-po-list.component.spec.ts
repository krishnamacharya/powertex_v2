import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangePoListComponent } from './price-change-po-list.component';

describe('PriceChangePoListComponent', () => {
  let component: PriceChangePoListComponent;
  let fixture: ComponentFixture<PriceChangePoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceChangePoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceChangePoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
