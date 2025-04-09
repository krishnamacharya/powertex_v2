import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitregisterprintComponent } from './transitregisterprint.component';

describe('TransitregisterprintComponent', () => {
  let component: TransitregisterprintComponent;
  let fixture: ComponentFixture<TransitregisterprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitregisterprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitregisterprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
