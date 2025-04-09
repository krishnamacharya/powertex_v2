import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnportsummaryprintComponent } from './onportsummaryprint.component';

describe('OnportsummaryprintComponent', () => {
  let component: OnportsummaryprintComponent;
  let fixture: ComponentFixture<OnportsummaryprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnportsummaryprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnportsummaryprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
