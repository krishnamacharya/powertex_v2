import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionwiseProductsComponent } from './professionwise-products.component';

describe('ProfessionwiseProductsComponent', () => {
  let component: ProfessionwiseProductsComponent;
  let fixture: ComponentFixture<ProfessionwiseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionwiseProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionwiseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
