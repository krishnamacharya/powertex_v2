import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersCompanyComponent } from './masters-company.component';

describe('MastersCompanyComponent', () => {
  let component: MastersCompanyComponent;
  let fixture: ComponentFixture<MastersCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
