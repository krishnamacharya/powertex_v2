import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgMenuComponent } from './catg-menu.component';

describe('CatgMenuComponent', () => {
  let component: CatgMenuComponent;
  let fixture: ComponentFixture<CatgMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatgMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatgMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
