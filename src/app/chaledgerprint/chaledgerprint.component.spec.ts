import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaledgerprintComponent } from './chaledgerprint.component';

describe('ChaledgerprintComponent', () => {
  let component: ChaledgerprintComponent;
  let fixture: ComponentFixture<ChaledgerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaledgerprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaledgerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
