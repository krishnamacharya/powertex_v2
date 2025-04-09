import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeDetailsformComponent } from './cheque-detailsform.component';

describe('ChequeDetailsformComponent', () => {
  let component: ChequeDetailsformComponent;
  let fixture: ComponentFixture<ChequeDetailsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeDetailsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeDetailsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
