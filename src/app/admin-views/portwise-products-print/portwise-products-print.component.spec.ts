import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortwiseProductsPrintComponent } from './portwise-products-print.component';

describe('PortwiseProductsPrintComponent', () => {
  let component: PortwiseProductsPrintComponent;
  let fixture: ComponentFixture<PortwiseProductsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortwiseProductsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortwiseProductsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
