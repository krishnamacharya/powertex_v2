import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExcelUploadComponent } from './product-excel-upload.component';

describe('ProductExcelUploadComponent', () => {
  let component: ProductExcelUploadComponent;
  let fixture: ComponentFixture<ProductExcelUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExcelUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
