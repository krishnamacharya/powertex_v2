import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListPrintComponent } from './packing-list-print.component';

describe('PackingListPrintComponent', () => {
  let component: PackingListPrintComponent;
  let fixture: ComponentFixture<PackingListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackingListPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
