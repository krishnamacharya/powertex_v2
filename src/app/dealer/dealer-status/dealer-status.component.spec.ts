import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerStatusComponent } from './dealer-status.component';

describe('DealerStatusComponent', () => {
  let component: DealerStatusComponent;
  let fixture: ComponentFixture<DealerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
