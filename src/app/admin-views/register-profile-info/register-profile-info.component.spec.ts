import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfileInfoComponent } from './register-profile-info.component';

describe('RegisterProfileInfoComponent', () => {
  let component: RegisterProfileInfoComponent;
  let fixture: ComponentFixture<RegisterProfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
