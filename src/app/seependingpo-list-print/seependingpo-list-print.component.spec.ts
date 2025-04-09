import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeependingpoListPrintComponent } from './seependingpo-list-print.component';

describe('SeependingpoListPrintComponent', () => {
  let component: SeependingpoListPrintComponent;
  let fixture: ComponentFixture<SeependingpoListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeependingpoListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeependingpoListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
