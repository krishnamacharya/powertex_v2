import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStockComponent } from './upload-stock.component';

describe('UploadStockComponent', () => {
  let component: UploadStockComponent;
  let fixture: ComponentFixture<UploadStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
