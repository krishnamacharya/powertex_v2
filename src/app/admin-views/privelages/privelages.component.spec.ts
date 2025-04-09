import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivelagesComponent } from './privelages.component';

describe('PrivelagesComponent', () => {
  let component: PrivelagesComponent;
  let fixture: ComponentFixture<PrivelagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivelagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivelagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
