import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrDetailComponent } from './pr-detail.component';

describe('PrDetailComponent', () => {
  let component: PrDetailComponent;
  let fixture: ComponentFixture<PrDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
