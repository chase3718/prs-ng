import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrApproveComponent } from './pr-approve.component';

describe('PrApproveComponent', () => {
  let component: PrApproveComponent;
  let fixture: ComponentFixture<PrApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
