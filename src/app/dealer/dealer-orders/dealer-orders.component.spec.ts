import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerOrdersComponent } from './dealer-orders.component';

describe('DealerOrdersComponent', () => {
  let component: DealerOrdersComponent;
  let fixture: ComponentFixture<DealerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
