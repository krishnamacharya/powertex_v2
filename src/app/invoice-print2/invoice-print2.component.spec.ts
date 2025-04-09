import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrint2Component } from './invoice-print2.component';

describe('InvoicePrint2Component', () => {
  let component: InvoicePrint2Component;
  let fixture: ComponentFixture<InvoicePrint2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePrint2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrint2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
