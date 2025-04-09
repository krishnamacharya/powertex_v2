import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaledgerComponent } from './chaledger.component';

describe('ChaledgerComponent', () => {
  let component: ChaledgerComponent;
  let fixture: ComponentFixture<ChaledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
