import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerShopeeComponent } from './dealer-shopee.component';

describe('DealerShopeeComponent', () => {
  let component: DealerShopeeComponent;
  let fixture: ComponentFixture<DealerShopeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerShopeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerShopeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
