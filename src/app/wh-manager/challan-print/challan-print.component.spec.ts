import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanPrintComponent } from './challan-print.component';

describe('ChallanPrintComponent', () => {
  let component: ChallanPrintComponent;
  let fixture: ComponentFixture<ChallanPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallanPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
