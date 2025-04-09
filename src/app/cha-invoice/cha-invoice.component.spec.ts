import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaInvoiceComponent } from './cha-invoice.component';

describe('ChaInvoiceComponent', () => {
  let component: ChaInvoiceComponent;
  let fixture: ComponentFixture<ChaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
