import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePackingListComponent } from './make-packing-list.component';

describe('MakePackingListComponent', () => {
  let component: MakePackingListComponent;
  let fixture: ComponentFixture<MakePackingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakePackingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
