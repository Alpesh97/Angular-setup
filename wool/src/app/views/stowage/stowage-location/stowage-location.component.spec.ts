import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StowageLocationComponent } from './stowage-location.component';

describe('StowageLocationComponent', () => {
  let component: StowageLocationComponent;
  let fixture: ComponentFixture<StowageLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StowageLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StowageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
