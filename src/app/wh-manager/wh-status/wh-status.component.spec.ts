import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhStatusComponent } from './wh-status.component';

describe('WhStatusComponent', () => {
  let component: WhStatusComponent;
  let fixture: ComponentFixture<WhStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
