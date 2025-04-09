import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMakeInvoiceComponent } from './import-make-invoice.component';

describe('ImportMakeInvoiceComponent', () => {
  let component: ImportMakeInvoiceComponent;
  let fixture: ComponentFixture<ImportMakeInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMakeInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMakeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
