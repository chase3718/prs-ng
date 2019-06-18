import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateComponent } from './vendor-create.component';

describe('VendorCreateComponent', () => {
  let component: VendorCreateComponent;
  let fixture: ComponentFixture<VendorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
