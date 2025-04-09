import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchaledgerComponent } from './adminchaledger.component';

describe('AdminchaledgerComponent', () => {
  let component: AdminchaledgerComponent;
  let fixture: ComponentFixture<AdminchaledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchaledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminchaledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
