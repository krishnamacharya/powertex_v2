import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPackinglistPrintComponent } from './supplier-packinglist-print.component';

describe('SupplierPackinglistPrintComponent', () => {
  let component: SupplierPackinglistPrintComponent;
  let fixture: ComponentFixture<SupplierPackinglistPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPackinglistPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPackinglistPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
