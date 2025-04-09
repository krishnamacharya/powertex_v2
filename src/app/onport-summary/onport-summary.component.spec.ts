import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnportSummaryComponent } from './onport-summary.component';

describe('OnportSummaryComponent', () => {
  let component: OnportSummaryComponent;
  let fixture: ComponentFixture<OnportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
