import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPoHistoryTabsComponent } from './supplier-po-history-tabs.component';

describe('SupplierPoHistoryTabsComponent', () => {
  let component: SupplierPoHistoryTabsComponent;
  let fixture: ComponentFixture<SupplierPoHistoryTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPoHistoryTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPoHistoryTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
