import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchTableComponent } from './batch-table.component';

describe('BatchTableComponent', () => {
  let component: BatchTableComponent;
  let fixture: ComponentFixture<BatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
