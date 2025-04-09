import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaCorrectionComponent } from './cha-correction.component';

describe('ChaCorrectionComponent', () => {
  let component: ChaCorrectionComponent;
  let fixture: ComponentFixture<ChaCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
