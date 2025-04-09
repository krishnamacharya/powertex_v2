import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFeedbackComponent } from './supplier-feedback.component';

describe('SupplierFeedbackComponent', () => {
  let component: SupplierFeedbackComponent;
  let fixture: ComponentFixture<SupplierFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
