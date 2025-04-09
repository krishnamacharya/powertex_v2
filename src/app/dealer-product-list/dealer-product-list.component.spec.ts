import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerProductListComponent } from './dealer-product-list.component';

describe('DealerProductListComponent', () => {
  let component: DealerProductListComponent;
  let fixture: ComponentFixture<DealerProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
