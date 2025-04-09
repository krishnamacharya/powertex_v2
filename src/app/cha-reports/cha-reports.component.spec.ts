import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaReportsComponent } from './cha-reports.component';

describe('ChaReportsComponent', () => {
  let component: ChaReportsComponent;
  let fixture: ComponentFixture<ChaReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
