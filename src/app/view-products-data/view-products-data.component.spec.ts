import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsDataComponent } from './view-products-data.component';

describe('ViewProductsDataComponent', () => {
  let component: ViewProductsDataComponent;
  let fixture: ComponentFixture<ViewProductsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
