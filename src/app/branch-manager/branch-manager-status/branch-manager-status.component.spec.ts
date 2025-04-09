import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerStatusComponent } from './branch-manager-status.component';

describe('BranchManagerStatusComponent', () => {
  let component: BranchManagerStatusComponent;
  let fixture: ComponentFixture<BranchManagerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchManagerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchManagerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
