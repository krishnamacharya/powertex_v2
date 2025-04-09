import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiStatusComponent } from './pi-status.component';

describe('PiStatusComponent', () => {
  let component: PiStatusComponent;
  let fixture: ComponentFixture<PiStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
