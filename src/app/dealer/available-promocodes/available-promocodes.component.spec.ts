import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePromocodesComponent } from './available-promocodes.component';

describe('AvailablePromocodesComponent', () => {
  let component: AvailablePromocodesComponent;
  let fixture: ComponentFixture<AvailablePromocodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailablePromocodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePromocodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
