import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedocumentchaprintComponent } from './invoicedocumentchaprint.component';

describe('InvoicedocumentchaprintComponent', () => {
  let component: InvoicedocumentchaprintComponent;
  let fixture: ComponentFixture<InvoicedocumentchaprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicedocumentchaprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicedocumentchaprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
