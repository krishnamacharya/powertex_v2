import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPoPrintComponent } from './supplier-po-print.component';

describe('SupplierPoPrintComponent', () => {
  let component: SupplierPoPrintComponent;
  let fixture: ComponentFixture<SupplierPoPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPoPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
