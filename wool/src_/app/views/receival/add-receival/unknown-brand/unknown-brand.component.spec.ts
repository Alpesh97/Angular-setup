import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownBrandComponent } from './unknown-brand.component';

describe('UnknownBrandComponent', () => {
  let component: UnknownBrandComponent;
  let fixture: ComponentFixture<UnknownBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
