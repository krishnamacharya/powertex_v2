import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieditComponent } from './piedit.component';

describe('PieditComponent', () => {
  let component: PieditComponent;
  let fixture: ComponentFixture<PieditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
