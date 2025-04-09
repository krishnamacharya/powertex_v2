import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDelaerShopeeComponent } from './master-delaer-shopee.component';

describe('MasterDelaerShopeeComponent', () => {
  let component: MasterDelaerShopeeComponent;
  let fixture: ComponentFixture<MasterDelaerShopeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDelaerShopeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDelaerShopeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
