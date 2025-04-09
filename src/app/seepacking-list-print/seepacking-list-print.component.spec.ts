import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeepackingListPrintComponent } from './seepacking-list-print.component';

describe('SeepackingListPrintComponent', () => {
  let component: SeepackingListPrintComponent;
  let fixture: ComponentFixture<SeepackingListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeepackingListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeepackingListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
