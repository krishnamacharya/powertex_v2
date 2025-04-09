import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPackingListComponent } from './supplier-packing-list.component';

describe('SupplierPackingListComponent', () => {
  let component: SupplierPackingListComponent;
  let fixture: ComponentFixture<SupplierPackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
