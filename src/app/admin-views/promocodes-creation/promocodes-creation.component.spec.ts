import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodesCreationComponent } from './promocodes-creation.component';

describe('PromocodesCreationComponent', () => {
  let component: PromocodesCreationComponent;
  let fixture: ComponentFixture<PromocodesCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocodesCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocodesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
