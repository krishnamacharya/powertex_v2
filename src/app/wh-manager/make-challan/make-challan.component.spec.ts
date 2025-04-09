import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeChallanComponent } from './make-challan.component';

describe('MakeChallanComponent', () => {
  let component: MakeChallanComponent;
  let fixture: ComponentFixture<MakeChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeChallanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
