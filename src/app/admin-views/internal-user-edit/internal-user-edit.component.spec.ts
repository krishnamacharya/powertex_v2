import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalUserEditComponent } from './internal-user-edit.component';

describe('InternalUserEditComponent', () => {
  let component: InternalUserEditComponent;
  let fixture: ComponentFixture<InternalUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
