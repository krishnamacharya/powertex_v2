import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaPaymentsComponent } from './cha-payments.component';

describe('ChaPaymentsComponent', () => {
  let component: ChaPaymentsComponent;
  let fixture: ComponentFixture<ChaPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
