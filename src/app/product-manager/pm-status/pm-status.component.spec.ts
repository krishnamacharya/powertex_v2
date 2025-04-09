import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmStatusComponent } from './pm-status.component';

describe('PmStatusComponent', () => {
  let component: PmStatusComponent;
  let fixture: ComponentFixture<PmStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
