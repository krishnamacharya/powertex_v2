import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackinglistMergedComponent } from './packinglist-merged.component';

describe('PackinglistMergedComponent', () => {
  let component: PackinglistMergedComponent;
  let fixture: ComponentFixture<PackinglistMergedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackinglistMergedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackinglistMergedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
