import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpiregisterComponent } from './pendingpiregister.component';

describe('PendingpiregisterComponent', () => {
  let component: PendingpiregisterComponent;
  let fixture: ComponentFixture<PendingpiregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingpiregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpiregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
