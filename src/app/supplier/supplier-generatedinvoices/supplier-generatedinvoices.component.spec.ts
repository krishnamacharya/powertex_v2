import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGeneratedinvoicesComponent } from './supplier-generatedinvoices.component';

describe('SupplierGeneratedinvoicesComponent', () => {
  let component: SupplierGeneratedinvoicesComponent;
  let fixture: ComponentFixture<SupplierGeneratedinvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierGeneratedinvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierGeneratedinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
