import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChallanListComponent } from './get-challan-list.component';

describe('GetChallanListComponent', () => {
  let component: GetChallanListComponent;
  let fixture: ComponentFixture<GetChallanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetChallanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetChallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
