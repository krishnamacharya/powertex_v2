import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSupplierInvoicesComponent } from './generated-supplier-invoices.component';

describe('GeneratedSupplierInvoicesComponent', () => {
  let component: GeneratedSupplierInvoicesComponent;
  let fixture: ComponentFixture<GeneratedSupplierInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedSupplierInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedSupplierInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
