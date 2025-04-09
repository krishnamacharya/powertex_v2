import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhPendingPackingListComponent } from './wh-pending-packing-list.component';

describe('WhPendingPackingListComponent', () => {
  let component: WhPendingPackingListComponent;
  let fixture: ComponentFixture<WhPendingPackingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhPendingPackingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhPendingPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
