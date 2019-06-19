import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrliEditComponent } from './prli-edit.component';

describe('PrliEditComponent', () => {
  let component: PrliEditComponent;
  let fixture: ComponentFixture<PrliEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrliEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
