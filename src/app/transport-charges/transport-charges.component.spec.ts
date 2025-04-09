import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportChargesComponent } from './transport-charges.component';

describe('TransportChargesComponent', () => {
  let component: TransportChargesComponent;
  let fixture: ComponentFixture<TransportChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
