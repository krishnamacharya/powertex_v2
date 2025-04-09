import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCatgegoryComponent } from './prod-catgegory.component';

describe('ProdCatgegoryComponent', () => {
  let component: ProdCatgegoryComponent;
  let fixture: ComponentFixture<ProdCatgegoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdCatgegoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCatgegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
