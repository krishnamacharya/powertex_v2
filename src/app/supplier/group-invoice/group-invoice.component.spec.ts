import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInvoiceComponent } from './group-invoice.component';

describe('GroupInvoiceComponent', () => {
  let component: GroupInvoiceComponent;
  let fixture: ComponentFixture<GroupInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
