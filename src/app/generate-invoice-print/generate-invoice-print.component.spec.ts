import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInvoicePrintComponent } from './generate-invoice-print.component';

describe('GenerateInvoicePrintComponent', () => {
  let component: GenerateInvoicePrintComponent;
  let fixture: ComponentFixture<GenerateInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
