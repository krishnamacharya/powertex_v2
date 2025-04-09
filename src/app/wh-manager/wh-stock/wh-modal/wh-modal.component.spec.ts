import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhModalComponent } from './wh-modal.component';

describe('WhModalComponent', () => {
  let component: WhModalComponent;
  let fixture: ComponentFixture<WhModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
