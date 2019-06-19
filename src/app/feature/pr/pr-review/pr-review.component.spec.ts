import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrReviewComponent } from './pr-review.component';

describe('PrReviewComponent', () => {
  let component: PrReviewComponent;
  let fixture: ComponentFixture<PrReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
