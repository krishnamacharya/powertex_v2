import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPoHistoryComponent } from './supplier-po-history.component';

describe('SupplierPoHistoryComponent', () => {
  let component: SupplierPoHistoryComponent;
  let fixture: ComponentFixture<SupplierPoHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
