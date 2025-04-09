import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPoPrintComponent } from './customer-po-print.component';

describe('CustomerPoPrintComponent', () => {
  let component: CustomerPoPrintComponent;
  let fixture: ComponentFixture<CustomerPoPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPoPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
