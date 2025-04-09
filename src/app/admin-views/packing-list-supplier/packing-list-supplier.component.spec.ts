import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListSupplierComponent } from './packing-list-supplier.component';

describe('PackingListSupplierComponent', () => {
  let component: PackingListSupplierComponent;
  let fixture: ComponentFixture<PackingListSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingListSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
