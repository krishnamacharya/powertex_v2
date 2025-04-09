import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReportsComponent } from './supplier-reports.component';

describe('SupplierReportsComponent', () => {
  let component: SupplierReportsComponent;
  let fixture: ComponentFixture<SupplierReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
