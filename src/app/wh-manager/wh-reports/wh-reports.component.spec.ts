import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhReportsComponent } from './wh-reports.component';

describe('WhReportsComponent', () => {
  let component: WhReportsComponent;
  let fixture: ComponentFixture<WhReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
