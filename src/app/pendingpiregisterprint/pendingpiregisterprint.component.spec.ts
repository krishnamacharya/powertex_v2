import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpiregisterprintComponent } from './pendingpiregisterprint.component';

describe('PendingpiregisterprintComponent', () => {
  let component: PendingpiregisterprintComponent;
  let fixture: ComponentFixture<PendingpiregisterprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingpiregisterprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpiregisterprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
