import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProformaListComponent } from './get-proforma-list.component';

describe('GetProformaListComponent', () => {
  let component: GetProformaListComponent;
  let fixture: ComponentFixture<GetProformaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProformaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProformaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
