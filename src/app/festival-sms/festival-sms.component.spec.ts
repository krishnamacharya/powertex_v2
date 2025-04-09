import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalSmsComponent } from './festival-sms.component';

describe('FestivalSmsComponent', () => {
  let component: FestivalSmsComponent;
  let fixture: ComponentFixture<FestivalSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivalSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
