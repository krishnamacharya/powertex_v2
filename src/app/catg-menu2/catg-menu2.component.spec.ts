import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgMenu2Component } from './catg-menu2.component';

describe('CatgMenu2Component', () => {
  let component: CatgMenu2Component;
  let fixture: ComponentFixture<CatgMenu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatgMenu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatgMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
