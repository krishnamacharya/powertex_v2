import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerRegistrationComponent } from './dealer-registration.component';

describe('DealerRegistrationComponent', () => {
  let component: DealerRegistrationComponent;
  let fixture: ComponentFixture<DealerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
