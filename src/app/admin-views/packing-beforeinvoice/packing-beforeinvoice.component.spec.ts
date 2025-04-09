import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingBeforeinvoiceComponent } from './packing-beforeinvoice.component';

describe('PackingBeforeinvoiceComponent', () => {
  let component: PackingBeforeinvoiceComponent;
  let fixture: ComponentFixture<PackingBeforeinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingBeforeinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingBeforeinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
