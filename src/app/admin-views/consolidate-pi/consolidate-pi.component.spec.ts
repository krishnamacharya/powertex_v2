import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatePiComponent } from './consolidate-pi.component';

describe('ConsolidatePiComponent', () => {
  let component: ConsolidatePiComponent;
  let fixture: ComponentFixture<ConsolidatePiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatePiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatePiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
