import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFileUploadsComponent } from './invoice-file-uploads.component';

describe('InvoiceFileUploadsComponent', () => {
  let component: InvoiceFileUploadsComponent;
  let fixture: ComponentFixture<InvoiceFileUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceFileUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFileUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
