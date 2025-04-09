import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySMSComponent } from './monthly-sms.component';

describe('MonthlySMSComponent', () => {
  let component: MonthlySMSComponent;
  let fixture: ComponentFixture<MonthlySMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
