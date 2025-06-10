import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivals1Component } from './new-arrivals1.component';

describe('NewArrivals1Component', () => {
  let component: NewArrivals1Component;
  let fixture: ComponentFixture<NewArrivals1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewArrivals1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArrivals1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
