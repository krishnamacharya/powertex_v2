import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsolidatePackingComponent } from './admin-consolidate-packing.component';

describe('AdminConsolidatePackingComponent', () => {
  let component: AdminConsolidatePackingComponent;
  let fixture: ComponentFixture<AdminConsolidatePackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsolidatePackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsolidatePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
