import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatePageComponent } from './associate-page.component';

describe('AssociatePageComponent', () => {
  let component: AssociatePageComponent;
  let fixture: ComponentFixture<AssociatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
