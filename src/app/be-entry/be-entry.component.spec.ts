import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeEntryComponent } from './be-entry.component';

describe('BeEntryComponent', () => {
  let component: BeEntryComponent;
  let fixture: ComponentFixture<BeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
