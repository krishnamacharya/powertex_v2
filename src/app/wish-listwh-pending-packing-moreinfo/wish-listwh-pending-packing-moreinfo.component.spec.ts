import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListwhPendingPackingMoreinfoComponent } from './wish-listwh-pending-packing-moreinfo.component';

describe('WishListwhPendingPackingMoreinfoComponent', () => {
  let component: WishListwhPendingPackingMoreinfoComponent;
  let fixture: ComponentFixture<WishListwhPendingPackingMoreinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishListwhPendingPackingMoreinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishListwhPendingPackingMoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
