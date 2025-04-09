import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoclistPrintComponent } from './doclist-print.component';

describe('DoclistPrintComponent', () => {
  let component: DoclistPrintComponent;
  let fixture: ComponentFixture<DoclistPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoclistPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoclistPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
