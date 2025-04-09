import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInvoicesListComponent } from './supplier-invoices-list.component';

describe('SupplierInvoicesListComponent', () => {
  let component: SupplierInvoicesListComponent;
  let fixture: ComponentFixture<SupplierInvoicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierInvoicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
