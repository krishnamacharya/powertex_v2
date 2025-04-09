import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingProductsComponent } from './upcoming-products.component';

describe('UpcomingProductsComponent', () => {
  let component: UpcomingProductsComponent;
  let fixture: ComponentFixture<UpcomingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
