import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProductListComponent } from './master-product-list.component';

describe('MasterProductListComponent', () => {
  let component: MasterProductListComponent;
  let fixture: ComponentFixture<MasterProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
