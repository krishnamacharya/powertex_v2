import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitregisterComponent } from './transitregister.component';

describe('TransitregisterComponent', () => {
  let component: TransitregisterComponent;
  let fixture: ComponentFixture<TransitregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
