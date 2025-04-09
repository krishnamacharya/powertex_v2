import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodataPrintComponent } from './podata-print.component';

describe('PodataPrintComponent', () => {
  let component: PodataPrintComponent;
  let fixture: ComponentFixture<PodataPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodataPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodataPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
