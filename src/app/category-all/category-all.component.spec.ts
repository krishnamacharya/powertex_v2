import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAllComponent } from './category-all.component';

describe('CategoryAllComponent', () => {
  let component: CategoryAllComponent;
  let fixture: ComponentFixture<CategoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
