import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrEditComponent } from './pr-edit.component';

describe('PrEditComponent', () => {
  let component: PrEditComponent;
  let fixture: ComponentFixture<PrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
