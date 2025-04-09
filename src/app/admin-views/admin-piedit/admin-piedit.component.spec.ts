import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieditComponent } from './admin-piedit.component';

describe('AdminPieditComponent', () => {
  let component: AdminPieditComponent;
  let fixture: ComponentFixture<AdminPieditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPieditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPieditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
