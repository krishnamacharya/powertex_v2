import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeinvoiceListComponent } from './seeinvoice-list.component';

describe('SeeinvoiceListComponent', () => {
  let component: SeeinvoiceListComponent;
  let fixture: ComponentFixture<SeeinvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeinvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeinvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
