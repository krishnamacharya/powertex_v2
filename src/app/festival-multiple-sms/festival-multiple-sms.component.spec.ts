import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalMultipleSmsComponent } from './festival-multiple-sms.component';

describe('FestivalMultipleSmsComponent', () => {
  let component: FestivalMultipleSmsComponent;
  let fixture: ComponentFixture<FestivalMultipleSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivalMultipleSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalMultipleSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
