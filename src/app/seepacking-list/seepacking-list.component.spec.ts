import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeepackingListComponent } from './seepacking-list.component';

describe('SeepackingListComponent', () => {
  let component: SeepackingListComponent;
  let fixture: ComponentFixture<SeepackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeepackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeepackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
