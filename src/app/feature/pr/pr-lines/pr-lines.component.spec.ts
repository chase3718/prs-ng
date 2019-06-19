import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrLinesComponent } from './pr-lines.component';

describe('PrLinesComponent', () => {
  let component: PrLinesComponent;
  let fixture: ComponentFixture<PrLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
