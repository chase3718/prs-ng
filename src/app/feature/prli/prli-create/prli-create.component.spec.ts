import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrliCreateComponent } from './prli-create.component';

describe('PrliCreateComponent', () => {
  let component: PrliCreateComponent;
  let fixture: ComponentFixture<PrliCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrliCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrliCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
