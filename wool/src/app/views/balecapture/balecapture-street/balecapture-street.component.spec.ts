import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalecaptureStreetComponent } from './balecapture-street.component';

describe('BalecaptureStreetComponent', () => {
  let component: BalecaptureStreetComponent;
  let fixture: ComponentFixture<BalecaptureStreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalecaptureStreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalecaptureStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
