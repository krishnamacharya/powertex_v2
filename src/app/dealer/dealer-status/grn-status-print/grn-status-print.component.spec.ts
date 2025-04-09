import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnStatusPrintComponent } from './grn-status-print.component';

describe('GrnStatusPrintComponent', () => {
  let component: GrnStatusPrintComponent;
  let fixture: ComponentFixture<GrnStatusPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnStatusPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnStatusPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
