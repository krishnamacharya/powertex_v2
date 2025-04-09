import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomergridviewComponent } from './customergridview.component';

describe('CustomergridviewComponent', () => {
  let component: CustomergridviewComponent;
  let fixture: ComponentFixture<CustomergridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomergridviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomergridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
