import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbComponent } from './subb.component';

describe('SubbComponent', () => {
  let component: SubbComponent;
  let fixture: ComponentFixture<SubbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
