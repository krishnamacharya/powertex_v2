import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceslistComponent } from './invoiceslist.component';

describe('InvoiceslistComponent', () => {
  let component: InvoiceslistComponent;
  let fixture: ComponentFixture<InvoiceslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
