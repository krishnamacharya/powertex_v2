import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchaledgerprintComponent } from './adminchaledgerprint.component';

describe('AdminchaledgerprintComponent', () => {
  let component: AdminchaledgerprintComponent;
  let fixture: ComponentFixture<AdminchaledgerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchaledgerprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminchaledgerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
