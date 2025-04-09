import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierConsolidatePackingComponent } from './supplier-consolidate-packing.component';

describe('SupplierConsolidatePackingComponent', () => {
  let component: SupplierConsolidatePackingComponent;
  let fixture: ComponentFixture<SupplierConsolidatePackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierConsolidatePackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierConsolidatePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
