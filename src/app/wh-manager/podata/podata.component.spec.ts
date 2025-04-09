import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodataComponent } from './podata.component';

describe('PodataComponent', () => {
  let component: PodataComponent;
  let fixture: ComponentFixture<PodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
