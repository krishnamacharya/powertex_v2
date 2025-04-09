import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrintComponent } from './pos-print.component';

describe('PosPrintComponent', () => {
  let component: PosPrintComponent;
  let fixture: ComponentFixture<PosPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
