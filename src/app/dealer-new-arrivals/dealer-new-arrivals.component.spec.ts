import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerNewArrivalsComponent } from './dealer-new-arrivals.component';

describe('DealerNewArrivalsComponent', () => {
  let component: DealerNewArrivalsComponent;
  let fixture: ComponentFixture<DealerNewArrivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerNewArrivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerNewArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
