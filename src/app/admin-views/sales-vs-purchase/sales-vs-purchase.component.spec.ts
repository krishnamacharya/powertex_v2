import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVsPurchaseComponent } from './sales-vs-purchase.component';

describe('SalesVsPurchaseComponent', () => {
  let component: SalesVsPurchaseComponent;
  let fixture: ComponentFixture<SalesVsPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesVsPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
