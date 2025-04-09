import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDcDetailsComponent } from './customer-dc-details.component';

describe('CustomerDcDetailsComponent', () => {
  let component: CustomerDcDetailsComponent;
  let fixture: ComponentFixture<CustomerDcDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDcDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
