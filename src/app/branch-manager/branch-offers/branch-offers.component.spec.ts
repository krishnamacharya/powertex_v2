import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOffersComponent } from './branch-offers.component';

describe('BranchOffersComponent', () => {
  let component: BranchOffersComponent;
  let fixture: ComponentFixture<BranchOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
