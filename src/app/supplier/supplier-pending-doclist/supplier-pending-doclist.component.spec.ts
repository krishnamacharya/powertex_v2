import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPendingDoclistComponent } from './supplier-pending-doclist.component';

describe('SupplierPendingDoclistComponent', () => {
  let component: SupplierPendingDoclistComponent;
  let fixture: ComponentFixture<SupplierPendingDoclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPendingDoclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPendingDoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
