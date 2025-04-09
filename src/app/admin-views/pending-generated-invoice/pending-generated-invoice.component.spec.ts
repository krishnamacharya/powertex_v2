import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingGeneratedInvoiceComponent } from './pending-generated-invoice.component';

describe('PendingGeneratedInvoiceComponent', () => {
  let component: PendingGeneratedInvoiceComponent;
  let fixture: ComponentFixture<PendingGeneratedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingGeneratedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingGeneratedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
