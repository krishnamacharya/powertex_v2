import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeinvoiceListPrintComponent } from './seeinvoice-list-print.component';

describe('SeeinvoiceListPrintComponent', () => {
  let component: SeeinvoiceListPrintComponent;
  let fixture: ComponentFixture<SeeinvoiceListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeinvoiceListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeinvoiceListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
