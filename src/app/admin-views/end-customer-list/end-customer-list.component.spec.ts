import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCustomerListComponent } from './end-customer-list.component';

describe('EndCustomerListComponent', () => {
  let component: EndCustomerListComponent;
  let fixture: ComponentFixture<EndCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
