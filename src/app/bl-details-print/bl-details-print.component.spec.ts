import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlDetailsPrintComponent } from './bl-details-print.component';

describe('BlDetailsPrintComponent', () => {
  let component: BlDetailsPrintComponent;
  let fixture: ComponentFixture<BlDetailsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlDetailsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlDetailsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
