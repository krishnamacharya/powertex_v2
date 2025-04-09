import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportInvoicePrintComponent } from './import-invoice-print.component';

describe('ImportInvoicePrintComponent', () => {
  let component: ImportInvoicePrintComponent;
  let fixture: ComponentFixture<ImportInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
