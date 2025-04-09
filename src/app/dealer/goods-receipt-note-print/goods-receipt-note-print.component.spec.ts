import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptNotePrintComponent } from './goods-receipt-note-print.component';

describe('GoodsReceiptNotePrintComponent', () => {
  let component: GoodsReceiptNotePrintComponent;
  let fixture: ComponentFixture<GoodsReceiptNotePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptNotePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptNotePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
