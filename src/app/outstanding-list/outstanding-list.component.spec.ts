import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingListComponent } from './outstanding-list.component';

describe('OutstandingListComponent', () => {
  let component: OutstandingListComponent;
  let fixture: ComponentFixture<OutstandingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
