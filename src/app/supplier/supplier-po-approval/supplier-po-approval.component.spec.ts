import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPoApprovalComponent } from './supplier-po-approval.component';

describe('SupplierPoApprovalComponent', () => {
  let component: SupplierPoApprovalComponent;
  let fixture: ComponentFixture<SupplierPoApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPoApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPoApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
