import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaprintComponent } from './chaprint.component';

describe('ChaprintComponent', () => {
  let component: ChaprintComponent;
  let fixture: ComponentFixture<ChaprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
