import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrliListComponent } from './prli-list.component';

describe('PrliListComponent', () => {
  let component: PrliListComponent;
  let fixture: ComponentFixture<PrliListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrliListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
