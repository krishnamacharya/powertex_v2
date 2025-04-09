import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeependingpoListComponent } from './seependingpo-list.component';

describe('SeependingpoListComponent', () => {
  let component: SeependingpoListComponent;
  let fixture: ComponentFixture<SeependingpoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeependingpoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeependingpoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
