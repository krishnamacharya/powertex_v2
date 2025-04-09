import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRevisedPiListComponent } from './supplier-revised-pi-list.component';

describe('SupplierRevisedPiListComponent', () => {
  let component: SupplierRevisedPiListComponent;
  let fixture: ComponentFixture<SupplierRevisedPiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRevisedPiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRevisedPiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
