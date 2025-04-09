import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerProductdataUploadComponent } from './dealer-productdata-upload.component';

describe('DealerProductdataUploadComponent', () => {
  let component: DealerProductdataUploadComponent;
  let fixture: ComponentFixture<DealerProductdataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerProductdataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerProductdataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
