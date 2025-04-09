import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeInvoiceComponent } from './make-invoice.component';

describe('MakeInvoiceComponent', () => {
  let component: MakeInvoiceComponent;
  let fixture: ComponentFixture<MakeInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
