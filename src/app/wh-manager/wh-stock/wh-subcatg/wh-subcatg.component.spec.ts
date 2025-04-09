import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhSubcatgComponent } from './wh-subcatg.component';

describe('WhSubcatgComponent', () => {
  let component: WhSubcatgComponent;
  let fixture: ComponentFixture<WhSubcatgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhSubcatgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhSubcatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
