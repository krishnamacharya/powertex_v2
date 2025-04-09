import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCreationComponent } from './faq-creation.component';

describe('FaqCreationComponent', () => {
  let component: FaqCreationComponent;
  let fixture: ComponentFixture<FaqCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
